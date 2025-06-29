MemoLog
MemoLog is a simple note logging application built with Node.js, Express, and MongoDB. It features user authentication via Google OAuth, allowing users to securely log in and manage their notes. The application utilizes EJS templates for rendering views and Passport.js for authentication.

Prerequisites
Node.js
MongoDB Atlas
Google Console Account for creating API Authentication Keys
Set Up Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:

MONGODB_URI=mongodb+srv://<username>:<password>@your-mongodb-url
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
SESSION_SECRET=YOUR_SESSION_SECRET
Replace username, password, YOUR_GOOGLE_CLIENT_ID, YOUR_GOOGLE_CLIENT_SECRET, your-mongodb-url, and YOUR_SESSION_SECRET with your actual MongoDB URI, Google OAuth credentials, and a secret string for session management.

Installation
Clone this repository to your local development environment.

$ npm install
$ npm start
To install and run this project - install dependencies using npm and then start your server. Your application will now be running at http://localhost:5000.
