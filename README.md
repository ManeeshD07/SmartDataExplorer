# Smart Data Explorer

  Smart Data Explorer is a full-stack web application that turns raw retail
  transaction data into interactive visual insights. Users authenticate through
  a secure JWT flow, explore top-selling grocery items, and view multiple
  Chart.js visualizations powered by a Flask API and MongoDB-backed user store.

  ## Features

  - **Authentication** – Register/login endpoints with bcrypt-hashed passwords
  and JWT-based session management (`backend/app.py:60`, `backend/app.py:80`).
  - **Data Exploration** – The backend aggregates the `Data/
  Groceries_dataset.csv` grocery basket dataset and serves the top products to
  the dashboard (`backend/app.py:21`, `backend/app.py:43`).
  - **Interactive Charts** – React + Chart.js dashboards render synchronized
  line, bar, and pie charts from the API response (`frontend/src/components/
  Dashboard.js:14`, `frontend/src/hooks/useFetchEVSalesData.js:38`).
  - **MongoDB Integration** – User credentials are stored in the `HCI.users`
  collection; update `backend/app.py` if you need different connection details.
  - **Extensible UI** – Additional chart components and styles are scaffolded
  for future features (`frontend/src/components/PurchaseFrequencyChart.js`,
  `frontend/src/components/TimeTrendChart.js`).

  ## Tech Stack

  - **Frontend**: React 18, React Router, Axios, Chart.js via `react-chartjs-2`
  - **Backend**: Flask, Flask-CORS, Flask-JWT-Extended, PyMongo, bcrypt, pandas
  - **Database**: MongoDB (default connection string `mongodb://localhost:27017/
  `)
  - **Data Sources**: `Data/Groceries_dataset.csv` (transaction-level grocery
  data), plus additional CSVs for future experiments

  ## Project Structure


  SmartDataExplorer-main/
  ├── backend/              # Flask API
  │   └── app.py
  ├── frontend/             # React dashboard
  │   └── src/
  │       ├── components/
  │       └── hooks/
  ├── Data/                 # Source datasets
  └── env/                  # Local virtual environment snapshot (optional)


  ## Prerequisites

  - Python 3.10+ and `pip`
  - Node.js 18+ and `npm`
  - Local MongoDB server (run `mongod` or connect to Atlas)
  - (Optional) Virtual environment tools such as `python -m venv`

  ## Backend Setup

  ```bash
  cd backend
  python -m venv .venv
  source .venv/bin/activate        # On Windows: .venv\Scripts\activate

  pip install flask flask-cors flask-jwt-extended pymongo bcrypt pandas python-
  dotenv
  # or populate backend/requirements.txt with the packages above and run: pip
  install -r requirements.txt

  Set required environment variables before starting Flask:

  export FLASK_APP=app.py
  export FLASK_ENV=development
  export JWT_SECRET_KEY="replace-with-a-strong-secret"

  > The code currently reads Data/Groceries_dataset.csv during startup. If you
  relocate or swap datasets, adjust the path in backend/app.py.

  Launch the API:

  flask run  # defaults to http://127.0.0.1:5000

  (Alternatively, run python app.py for the built-in debugger.)

  ## Frontend Setup

  cd frontend
  npm install
  npm start

  - The dev server runs on http://localhost:3000.
  - API calls expect the backend at http://127.0.0.1:5000; update the Axios base
  URL in frontend/src/hooks/useFetchEVSalesData.js if needed.

  ## Using the App

  1. Start MongoDB (mongod) and confirm the HCI database exists or will be
  created on first write.
  2. Run the Flask backend.
  3. Start the React frontend.
  4. Visit http://localhost:3000, register a new user, and log in.
  5. The dashboard will fetch the top 15 grocery items by frequency and
  render line, bar, and pie charts. JWT tokens are stored in localStorage for
  subsequent API calls.
  6. Use the “Logout” button to clear the token (frontend/src/components/
  Dashboard.js:54).

  ## API Overview

  | Endpoint                  | Method | Auth | Purpose
  |
  |---------------------------|--------|------|---------------------------------
  ----------------|
  | /register               | POST   | No   | Create user with username &
  password        |
  | /login                  | POST   | No   | Authenticate and return
  {"access_token": ...} |
  | /api/ev_sales           | GET    | Yes  | Return top item descriptions with
  counts        |
  | /protected              | GET    | Yes  | Example protected endpoint
  returning username   |

  Example /api/ev_sales response:

  [
    { "itemDescription": "whole milk", "Count": 2502 },
    { "itemDescription": "other vegetables", "Count": 1898 },
    ...
  ]

  ## Testing & Linting

  - Frontend unit tests: npm test
  - React build: npm run build
  - Backend tests are not currently included; consider adding pytest coverage
  for the API.

  ## Data Notes

  - Groceries_dataset.csv is a transactional market-basket dataset (approx. 32K
  rows) commonly used for association rule mining.
  - Electric_Vehicle_Population_Data.csv and Data/HistoricalPriceData/ are
  available for future visualizations; the current app only loads the groceries
  dataset.
  - Replace or augment datasets as needed, but ensure the backend endpoint
  returns data in the expected shape.

  ## Roadmap & Known Issues

  - backend/app.py has the JWT secret commented out; move the key to
  configuration or environment variables before production.
  - backend/requirements.txt is empty; populate it for reproducible installs.
  - Several React components (CustomerPurchasePatternsChart,
  PurchaseFrequencyChart, TimeTrendChart) expect API routes that are not yet
  implemented.
  - The dataset is loaded eagerly at import time; consider caching or lazy
  loading for large files.
  - Add input validation, rate limiting, and HTTPS-only cookies before deploying
  publicly.

