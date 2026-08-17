from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool

import random
import tempfile
import os
import threading

import utility.thingspeak_services as srv
from utility.waste_predict import predict_waste
from utility.thingspeak_services import write_bintoopen
from utility.mail_service import send_bin_alert_mail
from utility.settings import settings


app = FastAPI()


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {"status": "ok"}


# ============================================================
# BIN CATEGORY MAP
# ============================================================

BIN_CATEGORY_MAP = {
    1: "ewaste",
    2: "glass",
    3: "metal",
    4: "organic",
    5: "paper",
    6: "plastic",
}


CATEGORY_BIN_MAP = {
    "ewaste": 1,
    "glass": 2,
    "metal": 3,
    "organic": 4,
    "paper": 5,
    "plastic": 6,
}


# ============================================================
# WRITE BINTOPEN
# ============================================================

@app.get("/bintoopen/set/{value}")
def set_bintoopen(value: int):

    success = srv.write_bintoopen(value)

    return {
        "bintoopen": value,
        "success": success
    }


# ============================================================
# WRITE BINFULL
# ============================================================

@app.get("/binfull/set/{value}")
def set_binfull(value: int):

    success = srv.write_binfull(value)

    if not success:
        return "failure"

    if value in BIN_CATEGORY_MAP:

        category = BIN_CATEGORY_MAP[value]

        threading.Thread(
            target=send_bin_alert_mail,
            kwargs={
                "receiver_email": settings.email_admin,
                "category": category
            },
            daemon=True
        ).start()

    return "success"


# ============================================================
# READ BINTOPEN
# ============================================================

@app.get("/bintoopen")
def get_bintoopen():

    return srv.read_bintoopen()


# ============================================================
# READ BINFULL
# ============================================================

@app.get("/binfull")
def get_binfull():

    return {
        "binfull": srv.read_binfull()
    }


# ============================================================
# PREDICT + OPEN BIN
# ============================================================

@app.post("/predict-and-open-bin")
async def predict_and_open_bin(
    image: UploadFile = File(...)
):

    temp_image_path = None

    try:

        # ----------------------------------------------------
        # SAVE UPLOADED IMAGE
        # ----------------------------------------------------

        suffix = os.path.splitext(
            image.filename or ".jpg"
        )[1]

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as tmp:

            tmp.write(
                await image.read()
            )

            temp_image_path = tmp.name


        # ----------------------------------------------------
        # PREDICT WASTE
        #
        # Run CPU inference outside FastAPI's async event loop.
        # ----------------------------------------------------

        predicted_class, confidence = (
            await run_in_threadpool(
                predict_waste,
                temp_image_path
            )
        )


        # ----------------------------------------------------
        # CONVERT CATEGORY → BIN NUMBER
        # ----------------------------------------------------

        bin_number = CATEGORY_BIN_MAP.get(
            predicted_class,
            0
        )


        # ----------------------------------------------------
        # ENCODE VALUE
        #
        # Example:
        # glass = 2xx
        # plastic = 6xx
        # ----------------------------------------------------

        if bin_number != 0:

            data = (
                bin_number * 100
                + random.randint(1, 99)
            )

        else:

            data = 0


        # ----------------------------------------------------
        # UPDATE THINGSPEAK
        # ----------------------------------------------------

        success = write_bintoopen(
            data
        )


        # ----------------------------------------------------
        # RESPONSE
        # ----------------------------------------------------

        return {
            "predicted_class": predicted_class,
            "confidence": confidence,
            "bintoopen_value": data,
            "thingspeak_updated": success
        }


    finally:

        # ----------------------------------------------------
        # ALWAYS DELETE TEMP IMAGE
        # Even if prediction/API fails.
        # ----------------------------------------------------

        if (
            temp_image_path
            and os.path.exists(temp_image_path)
        ):

            try:
                os.remove(
                    temp_image_path
                )

            except OSError:
                pass