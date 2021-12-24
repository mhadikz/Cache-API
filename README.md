# Cache API

This service exposes methods to interact with a cache APIs. I have put API endpoints for Postman named "cache_api_collection.json" in the root folder. you can use it for more convenience.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Also, you can see .env.example file in the root folder.

`DB_ADDRESS` The address of the your local MongoDB

`DB_NAME` Your preferred database name

`DB_NAME_Test` Your preferred database name for test environment

`PORT` Your preferred port number for running the app on that.
## Running Locally

Step 1/5 - Clone the project:

```bash
  git clone https://github.com/mhadikz/Cache-API.git
```

Step 2/5 - Go to the project directory:

```bash
  cd Cache-API
```

Step 3/5 - Install dependencies:

```bash
  npm install
```

Step 4/5 - Start the server in the _production_ environment:

```bash
  npm start
```

Step 5/5 - Or start the server in the _development_ environment:

```bash
  npm run dev
```



## Running Tests

Step 1/3 - Make sure you have an active local MongoDB Connection before starting your test. Your tests will be failed if you don't have an active local MongoDB Connection.

Step 2/3 - Make sure you filled up env variables according to the "Environment Variables" part.


Step 3/3 - To run tests, run the following command:

```bash
  npm test
```
