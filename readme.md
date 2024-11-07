# HTML Forms Project

This project demonstrates the use of various HTML form inputs, event handlers, error handling, and Local Storage to create a user-friendly, interactive form application. The form accepts and validates multiple types of input and provides feedback to guide users through the process.

## Features

### 1. Built from Scratch
This project is entirely built with **pure HTML, CSS, and vanilla JavaScript**. No third-party libraries or frameworks were used, ensuring a lightweight, efficient, and highly customizable codebase. All form functionality, including validation, event handling, and data storage, is implemented from scratch.

### 2. Full Range of Form Elements
The form includes most frequently used HTML input elements, showcasing:
- **Text Input** - General fields for names, addresses, etc.
- **Email** - Validates correct email format.
- **Password** - Hidden text input with basic security requirements.
- **Checkboxes** - For selecting multiple options.
- **Radio Buttons** - For single-option selection from a group.
- **Textarea** - For larger text inputs like comments.
- **Dropdown (Select)** - Predefined options for quick selection.

### 3. Real-Time Form Validation and Error Handling
Each form input has associated validation logic and error handling. When an error is detected (e.g., invalid email format or missing required fields), a clear, user-friendly message is shown to help the user correct the issue. 

### 4. Event Handlers
This project uses JavaScript to add interactivity, making the form responsive to user actions. Examples of event handling include:
- **Input Change** - Updates form values in real time (for country input only yet).
- **Focus and Blur** - Highlights active fields and validates upon leaving a field.
- **Form Submission** - Prevents submission if any fields are invalid and shows error messages.
- **Reset Button** - Clears all fields and stored data, restoring the form to its initial state.

### 5. Data Persistence with Local Storage
User data is stored in the browser’s Local Storage, ensuring that form data persists even if the user navigates away or refreshes the page. When the user revisits the page, the form fields are automatically populated with the saved data, providing a seamless experience.

## Getting Started

### Prerequisites
A modern web browser that supports HTML5, CSS3, and JavaScript.

### Project URL
Try the live project at [addleads.netlify.app](https://addleads.netlify.app)

### Folder Structure
```
WebProject/
├── index.html          # Main HTML file
├── styles.css          # CSS styling for the form and layout
├── icons.js            # For encapsulating all the <svg /> icons used 
└── script.js           # JavaScript for validation, event handling, and local storage