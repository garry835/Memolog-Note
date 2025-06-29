📓 MemoLog – A Simple Note Logging Application
MemoLog is a simple yet secure note-logging application built with Node.js, Express, and MongoDB. It features user authentication via Google OAuth, allowing users to securely log in and manage personal notes. The app utilizes EJS for view rendering and Passport.js for handling authentication.

🔧 Prerequisites
Ensure you have the following installed and configured before running the project:

Node.js

MongoDB Atlas account

Google Developer Console account for creating OAuth credentials

⚙️ Environment Setup
In the root directory of the project, create a .env file.

Add the following environment variables:

ini
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@your-mongodb-url
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
SESSION_SECRET=YOUR_SESSION_SECRET
Replace the placeholders:

<username> and <password> with your MongoDB credentials

your-mongodb-url with your MongoDB cluster address

YOUR_GOOGLE_CLIENT_ID and YOUR_GOOGLE_CLIENT_SECRET with credentials from Google Console

YOUR_SESSION_SECRET with a secure random string for session management

🚀 Installation & Running the Project
Clone the repository to your local environment:

bash
Copy
Edit
git clone https://github.com/your-username/memolog.git
cd memolog
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
npm start
The application will now be running at:
👉 http://localhost:5000
