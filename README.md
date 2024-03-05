# Project Details

## Project Name: Mock

Project Description: Front end application where user can input variety of commands and see various outputs, that are all displayed on the page.
Team Members: Nicholas Li (nli24) and Anna Arantes (asantan7), contributed 50/50. Estimated time: 15 hours
Link to repo: https://github.com/cs0320-s24/mock-nli24-asantan7.git

# Design Choices

The biggest design choice we made was to have the history array as an array of JSX Elements. This allows for the REPLHistory to be very minimal, as all that is needed is to go through the history array of jsx elements and add them to the graphical interface. This made it so much easier to deal with REPLHistory as that is only responsible for high level adding of the JSX Element.
Additionally, we chose to have REPLInput organize high level interactions between logic and front-end graphical interfaces. This means that REPLInput calls the corresponding function, and transforms the resulting data/output into an HTML table within the History array. This helps separate the functionality between the different programs into different levels.
At the lowest level is the CommandHandler class which contains the logic for different commands. It produces the correct output as a 2dArray for the 4 commands.
These design choices help to delegate the functionality and make it so that not everything needs to know about all the different shared states, only the ones that actually are doing the setting/using the logic. For example, because we handle the different outputs of mode in REPLInput, there is no need for REPLHistory to know about the different modes.

# Errors/Bugs

None at the moment! Slight bug with jsx configuration in the unit testing (not sure if this counts as a bug though)

# Tests

## Playwright Tests

These are mostly self explanatory, especially with the comments in the file and the test description. The tests are organized by user story, with a large complex test at the end that tests for interactions among the various commands.

## Unit Tests

We wanted to unit test the convertArraytoTable function as that is pretty much the only helper function we used. However, when trying to create the expected output, we found that Typescript could not recognize the different JSX elements. We commented out the logic that contains this error. However, we wanted to demonstrate that this is the type of unit test we would write.

# How to run

## Running the program

`npm run start` — This starts a local server that compiles your code in real time. Make sure you are in the mock directory.
After you start the server, press the log in button to log in. You will not be able to access the command line if you don't.
In terms of commands, we have four possible commands: load_csv, view, search, and mode. Mode and view do not require any other arguments (ie you can input "mode" or "view" in the command line, where it says Enter Command Here!). For load and search, when you need to input an extra argument, use "+" instead of a space.
Load_csv requires an additional argument, where you specify the filepath. Currently, we only have 3 mocked filepaths which are "fruitCSV", "drinkCSV", and "noHeaderCSV". A correct load call looks like "load_csv+fruitCSV"
Search requires a total of 4 arguments in the following order: "search+columnName/index+value+Y/N". The second argument should be either an integer representing the column index or the column name if there are headers. The third argument represents the value to be searched for. The fourth argument represents whether or not there are headers, with a simple "Y"(yes) or "N"(no). Remember that you must load a file before searching, you will get an error if you don't. A correct search with the fruitCSV looks like "search+Name+Apple+Y".

Additionally, we have a mockedJson.ts class that holds mocked Data. This is where developers can choose to add/modify data for their own purposes.

## Running tests witih Playwright

`npm run test` — Runs tests

`npm run test:unit`, `npm run test:e2e` - Runs unit and end to end testing respectsively

`npx playwright show-report` — Shows a code breakdown of test progressions

`npx playwright test --ui`— Opens a UI that allows you to watch and trace your (failing) tests live in a browser

`npx playwright codegen <url>` — Opens a URL and generates tests with locators for elements on the page.
