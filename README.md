# jobs-portal
django and nextjs pet project

![DEMO](https://github.com/cseshahriar/jobs-portal/blob/main/backend/images/home.png)


# Features
* Athentication System
* Job Seeker
* Employer
* User profile
* Admin user management
* Job Listing

# Versions:
* 1 - Python 3.10.12
* 2 - Postgresql 14.12
* 3 - Nodejs 18.17.1

# postgit
* sudo apt-get install postgis postgresql-14-postgis-3
- sudo -u postgres psql
- \c your_database_name
- CREATE EXTENSION postgis;

# Download & Setup Instructions for the backend
* 1 - Clone project: git clone https://github.com/cseshahriar/jobs-portal.git
* 2 - cd jobs-portal && cd backend
* 3 - Create virtual environment: python3 -m venv venv
* 4 - for linux venv/bin/activate
* 5 - for windows venv\scripts\activate
* 5 - pip install -r requirements.txt
* 6 - python manage.py runserver

# Install frontend modules
* 1 - cd frontend
* 2 - npm install
* 3 - npm run dev
