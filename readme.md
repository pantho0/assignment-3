# Ecommerce Backend (B-3A-2)

## Description

This is a ecommerce projecr where user can create products & place order and can do other operations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- MongoDB installed on your local machine or have access to a MongoDB instance (either local or remote)
- Git installed on your local machine

## Installation

To install this project on your local machine, follow these steps:

1. Clone the repository to your local machine:
   git clone https://github.com/pantho0/assignment-3.git

2. Navigate to the project directory:
   cd your-project-directory
3. Install dependencies:
   npm install

## Configuration

Before running the project, you need to set up your environment variables. Create a .env file in the root directory of the project with the following content:

PORT=5000
DATABASE_URL=your_database_connection_string

Replace your_database_connection_string with the connection string of your MongoDB database.

Usage

To run the project locally, execute the following command:

npm start

This will start the server at the port specified in your .env file.

## Endpoints

Here are the endpoints provided by the API:

Endpoint: /api/products (get,post,put)
Endpoint: /api/orders (get,post)
