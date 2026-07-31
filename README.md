# Task Manager Web Application

## Overview

Task Manager is a full-stack web application built using Django REST Framework and React. It enables organizations to manage projects, tasks, users, and analytics through a modern responsive interface.

The application also includes an AI-powered assistant capable of answering company policy and workplace-related queries while maintaining contextual awareness of recent conversations.

---

# Features

## Authentication

- JWT Authentication
- User Registration
- Secure Login
- Role-Based Access Control
- Admin, Manager and Intern Roles

## Project Management

- Create Project
- Edit Project
- Delete Project
- Search Projects
- Project Status Management

## Task Management

- Create Tasks
- Assign Tasks
- Edit Tasks
- Delete Tasks
- Task Status Tracking
- Deadline Management

## Dashboard & Analytics

- Project Summary Cards
- Task Status Distribution
- Workload Distribution
- Recent Activity
- Interactive Charts

## AI Assistant

- Integrated AI Chatbot
- Context Awareness 
- Streaming Responses
- Chat History Stored in PostgreSQL
- Export Chat History as PDF
- Dark / Light Theme

## User Management

- User Profiles
- Edit Profile
- Password Change
- User Administration (Admin)

---

# Technology Stack

## Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Gemini API
- ReportLab (PDF Generation)

## Frontend

- React
- Bootstrap
- Axios
- Chart.js
- React Router

---

# Project Structure

backend/

taskmanager-frontend/

---

# Backend Setup

## Clone Repository

git clone <repository-url>

cd taskmanager-backend

## Create Virtual Environment

python -m venv venv

### Windows

venv\Scripts\activate

### Linux / macOS

source venv/bin/activate

## Install Dependencies

pip install -r requirements.txt

## Configure Environment

Create a .env file.

Example:

GEMINI_API_KEY=YOUR_API_KEY

DATABASE_NAME=taskmanager

DATABASE_USER=postgres

DATABASE_PASSWORD=your_password

DATABASE_HOST=localhost

DATABASE_PORT=5432

SECRET_KEY=your_secret_key

## Run Migrations

python manage.py migrate

## Start Backend

python manage.py runserver

---

# Frontend Setup

Open another terminal.

cd taskmanager-frontend

Install packages

npm install

Start frontend

npm run dev

Frontend

http://localhost:5173

Backend

http://127.0.0.1:8000

---


---

# Screenshots

See the "03 Screenshots" folder for:

- Login
- Registration
- Dashboard
- Analytics
- Projects
- Tasks
- AI Assistant
- PDF Export
- User Management
- Profile

---

# Demo Video

See the "04 Demo Video" folder.

The demo covers:

- Login
- Dashboard
- Project Management
- Task Management
- AI Assistant
- PDF Export
- Profile
- User Management

---

# Future Improvements

- Real-time WebSocket notifications
- Email notifications
- File attachments
- Team collaboration
- Calendar integration

---

# Developed By

Fiza Farook