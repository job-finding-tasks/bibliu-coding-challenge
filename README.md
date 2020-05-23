# BibliU coding challenge

## Technology stack

This application uses Node.js framework for parsing and storing metadata from the Project Gutenberg.

It uses MongoDB (with Mongoose) for data storage.

## Project Setup

### App Configuration

We have a sample env file called `.env.sample`. You should duplicate it and update the `.env` file with your configuration - proper Mongo connection string.

```
cp .env.sample .env
```

### Install dependencies

```
yarn
```

### Run import script

After making sure you have proper MongoDB connection string in your **.env** file, you can run importing script

```
FILE_PATH=path_to_your_rdf_file.rdf npm run import:gutenberg
```

**FILE_PATH** should be local path to the downloaded RDF file from the Project Gutenberg.

## Project structure

In the project structure we have the following parts:

```
|- scripts
 |- import
  |- gutenberg/
|- src
 |- models/
 |- services/
 |- utils/
 |- test/
```

`scripts` folder contains data importing scripts. As specified in the task, for now there is only Gutenberg importing script, but the structure is made in a way that it is easy to add new providers for data parsing in the future.

`models` folder contains Mongoose models. We have only `Book` model there for now.

`services` folder contains services required for our parser to work properly. It includes Gutenberg service (used for parsing Gutenberg data), file service (used for reading file content) and book service (used for storing parsed book data).

`utils` folder contains helper methods needed for proper application running. It has logic for connecting to the database and for logging messages.

`test` folder contains unit and integration tests for all implemented logic.

## Running tests

I used **Mocha** for tests and **Istanbul** for running tests coverage.

### Tests Configuration

Since I included one integration test to cover the whole process (from file reading, data parsing and data saving to the database), you will need to provide Mongo connection string for the test environment as well.

To do so, in the root of the project, run the following command:

```
cp .env.sample .env.test
```

After that, provide proper Mongo connection string for the test environment.

To run tests, run:

```
yarn test
```

To check tests coverage, run:

```
yarn test:coverage
```

## Additional notes

- I enforced DB level validation for **id**, **title** and **author** for each book. This is usually a requirement defined by the business logic. Since it was not specified, I used my intuition for minimum fields required to have a valid book saved
- DB level indexes were added on **Book** model (for **title**, **author** and **publicationDate** fields) to optimize the querying process
