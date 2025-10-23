Smart Data ExplorerSmart Data Explorer is a full-stack web application that turns raw retail transaction data into interactive visual insights. Users authenticate through a secure JWT flow, explore top-selling grocery items, and view multiple Chart.js visualizations powered by a Flask API and MongoDB-backed user store.FeaturesAuthentication – Register/login endpoints with bcrypt-hashed passwords and JWT-based session management (backend/app.py:60, backend/app.py:80).Data Exploration – The backend aggregates the Data/Groceries_dataset.csv grocery basket dataset and serves the top products to the dashboard (backend/app.py:21, backend/app.py:43).Interactive Charts – React + Chart.js dashboards render synchronized line, bar, and pie charts from the API response (frontend/src/components/Dashboard.js:14, frontend/src/hooks/useFetchEVSalesData.js:38).MongoDB Integration – User credentials are stored in the HCI.users collection; update backend/app.py if you need different connection details.Extensible UI – Additional chart components and styles are scaffolded for future features (frontend/src/components/PurchaseFrequencyChart.js, frontend/src/components/TimeTrendChart.js).Tech StackFrontend: React 18, React Router, Axios, Chart.js via react-chartjs-2Backend: Flask, Flask-CORS, Flask-JWT-Extended, PyMongo, bcrypt, pandasDatabase: MongoDB (default connection string mongodb://localhost:27017/)Data Sources: Data/Groceries_dataset.csv (transaction-level grocery data), plus additional CSVs for future experimentsProject StructureSmartDataExplorer-main/
├── backend/            # Flask API
│   └── app.py
├── frontend/           # React dashboard
│   └── src/
│       ├── components/
│       └── hooks/
├── Data/               # Source datasets
└── env/                # Local virtual environment snapshot (optional)
PrerequisitesPython 3.10+ and pipNode.js 18+ and npmLocal MongoDB server (run mongod or connect to Atlas)(Optional) Virtual environment tools such as python -m venvBackend Setupcd backend
python -m venv .venv
source .venv/bin/activate        # On Windows: .venv\Scripts\activate

pip install flask flask-cors flask-jwt-extended pymongo bcrypt pandas python-dotenv
# or populate backend/requirements.txt with the packages above and run: pip install -r requirements.txt

# Set required environment variables before starting Flask:

export FLASK_APP=app.py
export FLASK_ENV=development
export JWT_SECRET_KEY="replace-with-a-strong-secret"

# The code currently reads Data/Groceries_dataset.csv during startup. If you relocate or swap datasets, adjust the path in backend/app.py.

# Launch the API:

flask run # defaults to [http://127.0.0.1:5000](http://127.0.0.1:5000)

# (Alternatively, run python app.py for the built-in debugger.)
Frontend Setupcd frontend
npm install
npm start
The dev server runs on http://localhost:3000.API calls expect the backend at http://127.0.0.1:5000; update the Axios base URL in frontend/src/hooks/useFetchEVSalesData.js if needed.Using the AppStart MongoDB (mongod) and confirm the HCI database exists or will be created on first write.Run the Flask backend.Start the React frontend.Visit http://localhost:3000, register a new user, and log in.The dashboard will fetch the top 15 grocery items by frequency and render line, bar, and pie charts. JWT tokens are stored in localStorage for subsequent API calls.Use the “Logout” button to clear the token (frontend/src/components/Dashboard.js:54).API OverviewEndpointMethodAuthPurpose/registerPOSTNoCreate user with username & password/loginPOSTNoAuthenticate and return {"access_token": ...}/api/ev_salesGETYesReturn top item descriptions with counts/protectedGETYesExample protected endpoint returning usernameExample /api/ev_sales response:[
  { "itemDescription": "whole milk", "Count": 2502 },
  { "itemDescription": "other vegetables", "Count": 1898 },
  ...
]
Testing & LintingFrontend unit tests: npm testReact build: npm run buildBackend tests are not currently included; consider adding pytest coverage for the API.Data NotesGroceries_dataset.csv is a transactional market-basket dataset (approx. 32K rows) commonly used for association rule mining.Electric_Vehicle_Population_Data.csv and Data/HistoricalPriceData/ are available for future visualizations; the current app only loads the groceries dataset.Replace or augment datasets as needed, but ensure the backend endpoint returns data in the expected shape.Roadmap & Known Issuesbackend/app.py has the JWT secret commented out; move the key to configuration or environment variables before production.backend/requirements.txt is empty; populate it for reproducible installs.Several React components (CustomerPurchasePatternsChart, PurchaseFrequencyChart, TimeTrendChart) expect API routes that are not yet implemented.The dataset is loaded eagerly at import time; consider caching or lazy loading for large files.Add input validation, rate limiting, and HTTPS-only cookies before deploying publicly.
