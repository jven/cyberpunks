# Cyberpunks climbing game

![screenshot](https://i.ibb.co/XFfNMQb/Screenshot.png)

This is a rock climbing browser game!

See the latest version at 

- Uses the [Phaser](https://phaser.io) HTML5/JS game engine.
- Uses the [P2.js](https://schteppe.github.io/p2.js/) 2D physics engine.

## Running locally
1. Clone the repository:

```shell
$ git clone git@github.com:jven/cyberpunks.git
```

2. In the root directory, run:

```shell
.../cyberpunks $ heroku local web
[...]
2:27:11 PM web.1 |  Listening on 5000
```

3. Visit http://localhost:5000/ to run the game!

## Deploying to Heroku
1. Clone the repository:

```shell
$ git clone git@github.com:jven/cyberpunks.git
```

2. Commit any outstanding changes (with git commit).

3. Run:

```shell
.../cyberpunks $ git push heroku master
[...]
remote: Verifying deploy... done.
To https://git.heroku.com/obscure-chamber-23043.git
   d80e9c1..d5b5afd  master -> master
```

4. Run:

```shell
.../cyberpunks $ heroku open
```

to open the game in your browser!
