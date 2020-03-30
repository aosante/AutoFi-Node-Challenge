# AutoFi NodeJS Challenge

This is an application that processes a csv file upload, and saves the processed data into mongodb-memory-server, which is
an in memory database.

The endpoint also receives a provider name, which is used to determine the column layout/format of the resulting data.

# Design Decisions

This project has been structured using three main folders: routes, controllers, and services.

## Routes

Files inside this folder will be in charge of forwarding the request to the corresponding controller, and of providing
the service that the controller will call inside.

## Controllers

These files will serve as a bridge between client and data storage mechanism. They are in charge of receiving the request,
validating missing fields, and then returning the response provided by the service to the client. No business logic is performed here.

## Services

Files inside this folder will be in charge of processing data, handling business logic, and storing the resulting data
in the data storage mechanism. They also return the resulting response to the corresponding controller to be sent out to the client.

# Quick Start

### Install server dependencies

```bash
npm install
```

### Run the server

```bash
npm start
```

### Provide correct params

Add a parameter called providerName of type text, and a parameter called file of type file to make the post request.

For providerName, you can use a string like 'Dealer 3' for example.

You can choose a csv file inside the test-csv-files folder to use as the file param.

### Run tests

```bash
npm test
```

## Info

### Author

Andrés Osante
