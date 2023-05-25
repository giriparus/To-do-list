# TO-DO List Application

This is a web application that allows users to create and manage their TO-DO list. Users can register an account, log in, add and delete their TO-DO items.

## Features

- User registration: Users can create an account by providing their name, email, and password. 

- User authentication: Users can log in to their account using their email and password.

- TO-DO list management: Logged-in users can add new TO-DO items, update existing items, and delete items from their list.

- Session management: User authentication state is stored in sessions to maintain user sessions across multiple requests.

- MongoDB integration: The application uses MongoDB as the database to store user information and TO-DO items.

## Installation

1. Clone the repository:

2. Install the dependencies:

3. Set up the MongoDB database:
- Create a MongoDB database.
- Update the MongoDB connection string in the `config.js` file with your database credentials.

4. Start the application:

5. Open your browser and visit `http://localhost:3000` to access the application.

## Dependencies

- Express: Fast, unopinionated web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- Express Session: Simple session middleware for Express.
- Bcrypt: Library for hashing and comparing passwords.
- Connect Flash: Flash message middleware for Express.

## Contributing

Contributions are welcome! If you find any issues or want to suggest improvements, please feel free to open any issues or submit a pull request.

