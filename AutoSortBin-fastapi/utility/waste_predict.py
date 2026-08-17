import os
import numpy as np
from PIL import Image
import cv2

from ai_edge_litert import interpreter as tflite


# ============================================================
# MODEL CONFIGURATION
# ============================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "autosortbin_densenet121_float16.tflite"
)

IMG_SIZE = 224


# ============================================================
# OUR SIX AUTOSORTBIN CLASSES
# ============================================================

CLASS_NAMES = [
    "ewaste",
    "glass",
    "metal",
    "organic",
    "paper",
    "plastic"
]


# ============================================================
# LOAD MODEL ONCE
#
# IMPORTANT:
# Do NOT load the model inside predict_waste().
# The server loads it once when the application starts.
# ============================================================

interpreter = tflite.Interpreter(
    model_path=MODEL_PATH,
    num_threads=4
)

interpreter.allocate_tensors()


# ============================================================
# INPUT / OUTPUT DETAILS
# ============================================================

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

input_index = input_details[0]["index"]
output_index = output_details[0]["index"]


# ============================================================
# PREPROCESSING
#
# Must match the preprocessing used for our trained model.
#
# RGB
# ↓
# 224 x 224
# ↓
# Gaussian Blur 3x3
# ↓
# Median Filter 3x3
# ↓
# Normalize [0,1]
# ============================================================

def preprocess_image(image_path: str):

    # Read image
    image = cv2.imread(
        image_path
    )

    if image is None:

        raise ValueError(
            f"Could not read image: {image_path}"
        )


    # BGR → RGB
    image = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )


    # Resize
    image = cv2.resize(
        image,
        (IMG_SIZE, IMG_SIZE),
        interpolation=cv2.INTER_AREA
    )


    # Gaussian Blur
    image = cv2.GaussianBlur(
        image,
        (3, 3),
        0
    )


    # Median Filter
    image = cv2.medianBlur(
        image,
        3
    )


    # Normalize [0,1]
    image = (
        image.astype(np.float32)
        / 255.0
    )


    # Add batch dimension
    image = np.expand_dims(
        image,
        axis=0
    )


    return image


# ============================================================
# PREDICTION
# ============================================================

def predict_waste(
    image_path: str
) -> tuple[str, float]:

    """
    Predict waste category from image.

    Returns:
        (category, confidence_percentage)

    Categories:
        ewaste
        glass
        metal
        organic
        paper
        plastic
    """


    # --------------------------------------------------------
    # Check image
    # --------------------------------------------------------

    if not os.path.isfile(
        image_path
    ):

        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )


    # --------------------------------------------------------
    # Preprocess
    # --------------------------------------------------------

    image = preprocess_image(
        image_path
    )


    # --------------------------------------------------------
    # Inference
    # --------------------------------------------------------

    interpreter.set_tensor(
        input_index,
        image
    )

    interpreter.invoke()


    # --------------------------------------------------------
    # Get prediction
    # --------------------------------------------------------

    predictions = interpreter.get_tensor(
        output_index
    )[0]


    # --------------------------------------------------------
    # Find highest probability
    # --------------------------------------------------------

    class_index = int(
        np.argmax(predictions)
    )

    confidence = (
        float(
            predictions[class_index]
        ) * 100
    )


    # --------------------------------------------------------
    # Class
    # --------------------------------------------------------

    predicted_class = (
        CLASS_NAMES[class_index]
    )


    return (
        predicted_class,
        round(confidence, 2)
    )