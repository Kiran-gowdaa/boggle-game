# About the project

The is a Boggle Game project built using Angular latest version and TypeScript and node version of 20.10.0.
Check out how to run and play by following the steps below.

(Note: The translation for german and french might not be right as they were taken from Google translate)

# How to Play?

Boggle™ is a word game in which players attempt to find words in sequences of adjacent letters on a plastic grid of lettered dice

1. The total game time is 3 minutes, each player gets 1 minute 3 seconds.
2. Choose a language before you go ahead. (Supported language English, German and French).
3. It's a Two Player game(Player 1: Cyborg99 and Player 2: Strike Eagle).
4. Each valid word is a given a number of points based on its character count, the greater the length the more points.
   Word length = 3, 4 = 1 point.
   Word length = 5 = 2 points.
   Word length = 6 = 3 points.
   Word length = 7 = 5 points.
   Word length = 8+ = 11 points.
5. Each player word must be unique to each other.
6. The player with the highest score (Total), wins the game.

Note:

1. Presently the language of the game can be changed dynamically that is at any point of the game! To have best game play please choose one language at the start of the game and dont change till the game play is done!
2. This game is not tested with other languages, please feel free to play around and do let me know if you find any issues, I would be happy to rectify it.

# The complete logic of the game can be seen in the form of flow chart

Open the `BCT-Boggle-Game-FlowChart.png` to see the working logic, which you can find it in main directory.

# Before running locally, check/follow the steps.

1. Please check for the node version the system is running.
2. Run `npm install -g @angular/cli`, to install Angular CLI and related files.
3. Run `npm i` or `npm install` to install all the related node files.

(Note: If you are using Mac please use sudo before the command)

# BctBoggleApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

There are tests running for the boggle.service.ts in boggle.service.spec.ts, which contains all the major functions for the game play.
Feel free to break the code and run the test locally by following the instruction below.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

Feel free to reach out, if oyu face any issue (chandrakiranrevanna@gmail.com).
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
