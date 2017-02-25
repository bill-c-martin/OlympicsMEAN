# Olympics MEAN App

This is an app built on the MEAN Stack while following along with the ["Firing a Tracer Bullet"](https://www.codeschool.com/screencasts/mean-stack-firing-a-tracer-bullet), ["Anchor Links, Routes, and Medals"](https://www.codeschool.com/screencasts/mean-stack-anchor-links-routes-and-medals), and 
["Adding New Medals"](https://www.codeschool.com/screencasts/mean-stack-adding-new-medals) screencasts concluding codeschool.com's [MEAN Stack](https://www.codeschool.com/mean) path:

* MongoDB
* Express
* Angular
* Node.js

## Running on Localhost

1. Install the following:
  1. `nodejs`
  1. `mongodb`
  1. `mongodb-tools`, which is needed for its `mongoimport` util for DB seeding
1. Run `$ npm install` from inside this project root to resolve dependencies
1. Seed the database by running the following from inside the project root: 
  1. `$ mongoimport --db olympics-dev --collection sports --type json --file server/sports-seed.json --jsonArray --drop`
1. Run the mongod server from anywhere: `$ mongod`
1. Run the node server by going to the project root and running: `$ node server/app.js` 
  1. A status should display confirming that it's `Listening on 8181`
  1. Another status should confirm that it is `Connected to Mongo`.
1. Go to `http://localhost:8181/` in the browser to render the app

## Developing

1. Run `$ npm run watch` in the project root to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js`, which is included by index.html
