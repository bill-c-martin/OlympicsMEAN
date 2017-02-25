"use strict";

let express    = require("express");
let app        = express();
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let mongoUtil  = require('./mongoUtil');

mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );
app.use( '/node_modules', express.static(__dirname + "/../node_modules") );

app.get("/sports", (request, response) => {
	let sports = mongoUtil.sports();

	sports.find().toArray((err, docs) => {
		if(err) {
			response.sendStatus(400);
		}

		let sportNames = docs.map((sport) => sport.name)
		response.json(sportNames);
	});
});

app.get("/sports/:name", (request, response) => {
	let sportName = request.params.name;
	let sports    = mongoUtil.sports();
	
	sports.find({name: sportName}).limit(1).next((err, doc) => {
		if(err) {
			response.sendStatus(400);
		}

		console.log("Sport doc: ", doc);
		response.json(doc);

	});
});

app.post("/sports/:name/medals", jsonParser, (request, response) => {
	let sportName = request.params.name;
	let newMedal  = request.body.medal;

	console.log("Sport name: ", sportName);
	console.log("Medal name: ", newMedal);

	response.sendStatus(201);

});

app.listen(8181, () => console.log("Listening on 8181"));
