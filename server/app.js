"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');

mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );
app.use( '/node_modules', express.static(__dirname + "/../node_modules") );

app.get("/sports", (request, response) => {
	let sports = mongoUtil.sports();

	sports.find().toArray((err, docs) => {
		let sportNames = docs.map((sport) => sport.name)
		response.json(sportNames);
	});
});

app.listen(8181, () => console.log("Listening on 8181"));
