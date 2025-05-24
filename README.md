# Mhadle

A [My Hero Academia](https://en.wikipedia.org/wiki/My_Hero_Academia) [Wordle](https://en.wikipedia.org/wiki/Wordle) game variant. Try to guess the hidden character. A new character to guess is available each day.

The game is hosted at [..]().

## Development

The game is built with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/). Python scripts located in `scripts` are used to generate the game data.

### Running the Game Locally

Mhadle was developed using Nodejs v22.13.1. To run the game locally, you will need to have Nodejs installed. You can install the required dependencies by running `npm install` in the root of the project. After the dependencies are installed, you can run the game by running `ng serve`. The game will be hosted at `http://localhost:4200/`.

### Building the Game

To build the game, you can run `npm run build`. The built files will be located in the `dist` directory. The game can be hosted on any static file server.

### Deploying the Game

The game is hosted on [Vercel](https://vercel.com/). The game is automatically deployed when changes are pushed to the `master` branch.


## Gameplay

If you finish a game you can enter the _infinite_ mode. Here you can guess as many students as you want. The game will __not__ remember your progress.
