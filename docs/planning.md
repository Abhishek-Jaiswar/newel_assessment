# Technical Test - Planning and Documentation

## Introduction

This document covers initial planning, decisions, and development approach for this project.
The goal is to build a responsive and functional frontend based on three provided UI screens.

- Auth Form
- List Page
- Edit/Update Page

## Project Requirements or Workflow

After analyzing the UI screens, the intended workflow is as follows:

1. The main screen of the application is the **Auth Page**, which includes:

   - **Register Form**
   - **Login Form**

2. Next screen is the **List Page**, where all items are listed. This page includes the following features:

   - List of all items with 3 action buttons:
     - **View Button**
     - **Edit/Update Button**
     - **Delete Button**
   - A functional **search bar**
   - An **"Add New"** button to add new items to the list

3. The last screen is for **Add/Edit**, which includes the following features:
   - Several input boxes to enter item details
   - Three action buttons:
     - **Update**
     - **Save**
     - **Back**

## Chosen Tech Stack

Although this application could be built using plain HTML, CSS, and JavaScript due to its simplicity, I have chosen to use **React.js** to demonstrate my proficiency in building modular and scalable frontend applications.

- **Frontend:** React.js for component-based architecture  
- **Styling:** Pure CSS to showcase custom design skills without relying on frameworks
- **Build Tool:** Vite

## Implementation Plan

I will follow a structured approach to implement the features:

1. **Project Setup**
   - Initialize project with Vite
   - Setup folder structure
   - Configure routing (React Router)

2. **Build Auth Page**
   - Create Login and Register forms
   - Handle input state and validation

3. **Build List Page**
   - Display list of items using mock data
   - Implement search bar
   - Add buttons: View, Edit, Delete

4. **Build Add/Edit Page**
   - Reuse form component
   - Handle form state for both modes
   - Add Save, Update, and Back button functionality

5. **Finalize**
   - Validate all form interactions
   - Ensure responsive layout
   - Cross-browser check

## Assumptions

While the technical test did not explicitly require a backend, I have decided to include a **simple backend layer** (or mock backend simulation) to demonstrate my understanding of fullstack development and data handling.

### Backend Consideration:
- There was no supervision or mention of backend requirements.
- However, to simulate realistic CRUD operations (Create, Read, Update, Delete), I will:
  - Either implement a lightweight **Node.js + Express** backend, or
  - Use an in-memory or localStorage-based mock service.

This approach will allow me to show:
- API integration using `fetch` or `axios`
- Handling form submissions and list data dynamically
- Better separation of concerns (frontend ↔ backend)

---

### UI & Feature Assumptions:
Since the UI was provided as images without detailed behavior specs, I’ve made the following assumptions:

- **Auth Page** will simulate authentication (no real user system).
- **List Page** items are assumed to have at least: `id`, `title`, `date`, and `status`.
- **Add/Edit Page** uses the same form component, populated dynamically when editing.
- **Delete Button** will ask for confirmation before removing an item.
- **Search Bar** is case-insensitive and filters by title.
- **View Button** may navigate to a detail page or show a modal (I'll implement one of these if needed).

These assumptions are made to ensure the application is functionally complete while staying true to common UX expectations.

