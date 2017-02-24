"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');

mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
	response.json(['Cycling', 'Weightlifting']);
});

app.listen(8181, () => console.log("Listening on 8181"));
