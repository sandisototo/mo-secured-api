# Mo-Secured Access Control API

This is a gated security area access code generator API

#### Health
The objective of the health endpoint is to ensure that the external dependencies of the application are healthy and be
reached. As such, the application is considered healthy if the database and health endpoint can be reached.

#### Get Health
You can query the health status of the application conveniently on the following endpoint.

`[GET] /health/health`

Response 200
```json
{
  "healthController": "healthy",
  "databaseConnection": "healthy"
}
```

## Environment Variables
The following table represents the variables that are required to be in the environment for the application to use at
run time. 

| Name              | Description                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------|
| PORT              | The port that the application will be exposed on once hosted.                                  | 
| DATABASE_URL      | The URL to be used to connect to the given database.                                           |
| DATABASE_NAME     | The name of the database that will be used.                                                    |
| DATABASE_ENGINE   | The database engine that the application will be connecting to.                                |
| DATABASE_USERNAME | The username credential to access the database.                                                |
| DATABASE_PASSWORD | The password credential to access the database.                                                |
| LOGGER_LEVEL      | The level of logging required. info/debug/trace are most common.                               |
| LOGGER_SERVICE    | The name for the basic application level logger which will be used to spawn all child loggers. |
| LOGGER_LOGGLY_TOKEN     | The token used for authentication on Loggly                                              |
| LOGGER_LOGGLY_SUBDOMAIN | The subdomain used for authentication on Loggly                                          |

## Running the app
To run this project locally, the below commands can be used.

```bash
$ npm i
$ npm run watch:dev # This will start nodemon for refresh on save
$ npm run test # For unit tests, not much focus has been put to this 
$ npm run build # For deployment files that can be found in the `dist/` folder
```

## Logging
This application has centralised logging using [Loggly](http://loggly.com/) and all production logs by default are sent
through to it.

## License
MIT License

Copyright (c) 2022 Sandiso Toto
