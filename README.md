# Process Mining Tool

A comprehensive process mining platform inspired by Disco, built with Django and modern web technologies.

## Features

- 📊 Process Discovery (Alpha, Heuristics, Inductive Miner)
- 🔍 Conformance Checking
- 🤖 Predictive Analytics with LSTM
- 📈 Interactive Process Visualizations
- 👥 Multi-user Support with Role-based Access
- 🔐 Premium Licensing System

## Quick Start

### Prerequisites

- Python 3.12+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amir-saberi/process-mining-tool-inspired-by-disco.git
   cd process-mining-tool-inspired-by-disco
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations**
   ```bash
   python manage.py migrate
   ```

4. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

5. **Start the server**
   ```bash
   python manage.py runserver
   ```

6. **Access the application**
   - Main app: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## Default Login

After running migrations, you can register a new account or create a superuser to access admin features.

## Tech Stack

- **Backend:** Django 6.0, Django REST Framework
- **Process Mining:** PM4Py
- **ML/AI:** TensorFlow, Keras, scikit-learn
- **Database:** SQLite (default)
- **Frontend:** HTML, CSS, JavaScript

## License

MIT License
