"use strict";

let express    = require("express");
let app        = express();
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let mongoUtil  = require('./mongoUtil');

mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );
app.use( '/node_modules', express.static(__dirname + "/../node_modules") );

// Get all sports
app.get("/sports", (req, res) => {
	let sports = mongoUtil.sports();

	sports.find().toArray((err, docs) => {
		if(err) {
			res.sendStatus(400);
		}

		let sportNames = docs.map((sport) => sport.name)
		res.json(sportNames);
	});
});

// Get the medals for a particular sport
app.get("/sports/:name", (req, res) => {
	let sportName = req.params.name;
	let sports    = mongoUtil.sports();
	
	sports.find({name: sportName}).limit(1).next((err, doc) => {
		if(err) {
			res.sendStatus(400);
		}

		console.log("Sport doc: ", doc);
		res.json(doc);

	});
});

// Create new medal
app.post("/sports/:name/medals", jsonParser, (req, res) => {
	let sportName = req.params.name;
	let newMedal  = req.body.medal || {};

	if(!newMedal.division || !newMedal.year || !newMedal.country) {
		res.sendStatus(400);
	}

	// Store medal in DB
	let sports    = mongoUtil.sports();
	let query     = { name: sportName };
	let update    = { $push: { goldMedals: newMedal } };

	sports.findOneAndUpdate(query, update, (err, update_res) => {
		if(err) {
			res.sendStatus(400);
		}
		res.sendStatus(201);
	});
});

app.listen(8181, () => console.log("Listening on 8181"));
