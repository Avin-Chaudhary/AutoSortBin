# ♻️ AutoSortBin – Smart Waste Segregation System

AutoSortBin is an **AI and IoT-powered smart waste management system**, proposed and validated through a peer-reviewed research study, that automatically classifies waste into multiple categories and monitors bin status in real time using **FastAPI, React (Vite), and ThingSpeak**.


The project is built with **clean environment-based configuration**, allowing seamless switching between **local development** and **production deployments** without any code changes.

## 📄 Research Publication

This project is based on our peer-reviewed research article published by **Springer**:

**_AutoSortBin: Integrating CPS and IoT with Densely Connected Convolutional Networks for Sustainable Waste Management_**  
📘 *Journal of Reliable Intelligent Environments (Springer, 2025)*  

🔗 **Paper Link:**  
https://link.springer.com/article/10.1007/s41314-025-00088-z


---

## 🚀 Features

- 🧠 AI-based waste classification using camera input
- 🗂️ Six waste categories:
  - Paper
  - Plastic
  - Glass
  - Metal
  - Organic
  - E-Waste
- 🌐 Real-time bin monitoring with ThingSpeak
- 📧 Automated email alerts when bin is full (Brevo)
- ⚙️ ESP32-based IoT integration
- 🖥️ React frontend with FastAPI backend
- 🔐 Secure environment-variable-based configuration

---

## 🏗️ Tech Stack

### Frontend

- React (Vite)
- JavaScript
- HTML / CSS

### Backend

- FastAPI (Python)
- Uvicorn
- python-dotenv

### AI / ML

- DenseNet-121 (Transfer Learning)
- Custom dataset (AutoSortBin)

### IoT & Cloud

- ESP32
- ThingSpeak
- Brevo Email API

### Deployment

- Frontend: Vercel
- Backend: Render

---

## 📁 Project Structure

```
AutoSortBin-v1/
│
├── .gitignore
├── .gitattributes
├── README.md
│
├── AutoSortBin-React/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── config/
│ │ │ └── api.js
│ │ └── styles/
│ ├── .env.development # Local only (ignored)
│ ├── package.json
│ ├── vite.config.js
│ └── eslint.config.js
│
├── AutoSortBin-fastapi/
│ ├── server.py
│ ├── requirements.txt
│ ├── venv/ # Local only (ignored)
│ ├── .env # Local only (ignored)
│ └── utility/
│ ├── settings.py
│ ├── waste_predict.py
│ ├── mail_service.py
│ ├── thingspeak_services.py
│ └── predictWaste12.tflite
│
└── AutoSortBin-nodejs/ # Optional / future use
```

---

## 🔑 Environment Variables

### Frontend (Vite)

**Local – `.env.development`**

```
VITE_API_BASE_URL=http://localhost:8000
```

**Production (Vercel)**

```
VITE_API_BASE_URL=https://your-project-name.onrender.com
```

---

### Backend (FastAPI)

**Local – `.env`**

```
ENV=development
PYTHON_VERSION=3.10.13
BREVO_API_KEY=your_brevo_key
EMAIL_ADMIN=admin@example.com
EMAIL_SENDER=autosortbin@example.com
THINGSPEAK_CHANNEL_ID=xxxx
THINGSPEAK_READ_API_KEY=xxxx
THINGSPEAK_WRITE_API_KEY=xxxx
```

**Production (Render)**  
Same keys added via Render Environment Variables dashboard.

---

## ▶️ Running Locally

### Backend (FastAPI)

```bash
# move to FastAPI backend folder
cd AutoSortBin-fastapi

# ------------------------------------------------
# Python version requirement
# ------------------------------------------------
# REQUIRED:
#   Python 3.10 or 3.11
#
# Reason:
#   TensorFlow / TensorFlow Lite do NOT support
#   Python 3.12+ on Windows.
# ------------------------------------------------

# create virtual environment
python -m venv venv

# activate virtual environment
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux / macOS

# IMPORTANT: always use venv's python for installs

# ---------- WINDOWS (Local Development) ----------
venv\Scripts\python.exe -m pip install --upgrade pip
venv\Scripts\python.exe -m pip install -r requirements.local.txt

# ---------- LINUX / macOS / RENDER (Production) ----------
# python -m pip install --upgrade pip
# python -m pip install -r requirements.txt

# start FastAPI server
venv\Scripts\python.exe -m uvicorn server:app --reload --port 8000

```

### Frontend (React)

```bash
cd AutoSortBin-React
npm install
npm run dev
```

React will automatically connect to **local FastAPI** in development.

---

## 🌍 Production Deployment

- **Frontend** deployed on **Vercel**
- **Backend** deployed on **Render**
- Environment variables control API routing automatically
- No code changes between development and production

---

## 🔍 API Endpoints

- `GET /health` – Health check
- `POST /predict-and-open-bin` – Waste classification & bin control

---

## 🧠 Architecture Overview

```
Camera → AI Model → FastAPI → ThingSpeak
                      ↓
                   Email Alert
                      ↓
                   React UI
```

## 🧪 ESP32 Circuit Simulation (Wokwi)

The complete embedded system is simulated using **Wokwi**, enabling safe and reproducible testing without physical hardware.

The simulation includes:
- ESP32 microcontroller  
- Servo motors for bin lid actuation  
- Ultrasonic sensors for bin-full detection  
- 16×2 LCD display for real-time feedback  

This setup mirrors the real hardware logic described in the published paper and ensures end-to-end validation of the CPS-IoT workflow.


---

## 🧪 Dataset

- Custom-built dataset: **976 labeled images**
- Balanced across six waste categories
- Used with DenseNet-121 via transfer learning

## 📊 Model Performance

The fine-tuned **DenseNet-121** model demonstrated strong and consistent performance across training, validation, and testing phases:

| Metric | Training | Validation | Testing |
|------|----------|------------|---------|
| Accuracy | ~94.6% | ~94.6% | ~94.7% |
| Precision | ~95.8% | ~95.2% | ~95.5% |
| Recall | ~93.9% | ~93.7% | ~94.0% |
| F1-Score | ~94.8% | ~94.4% | ~94.7% |

The model outperformed commonly used architectures such as **ResNet-50** and **VGG-16** in both accuracy and computational efficiency for the given task.


---

## 📌 Best Practices Followed

- Environment-based configuration
- No hardcoded secrets
- Clean CORS handling
- Modular frontend API handling
- Production-ready deployment flow

---

## 📜 License

This project is for **academic and research purposes**.

---

## 👨‍💻 Author

**Avin Chaudhary**

- GitHub: https://github.com/Avin-Chaudhary
- LinkedIn: https://www.linkedin.com/in/avin-chaudhary-728a992aa

---

⭐ If you like this project, don’t forget to star the repository!
