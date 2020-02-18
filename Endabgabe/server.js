"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var endabgabe;
(function (endabgabe) {
    let highscores;
    let databaseURL = "mongodb+srv://merdi:187@cluster0-mklga.mongodb.net/test?retryWrites=true&w=majority";
    let dbName = "Database";
    let dbCollection = "Highscores";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = HTTP.createServer();
        console.log(_port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection ", highscores != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("Request kam rein");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // _response.write("HalliHallo" + "</br>");
        // _response.write("Port: " + port + "</br>");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ": " + url.query[key] + "<br/>");
            // } 
            if (url.query["command"] == "retrieve") {
                let report = await retrieveOrders();
                if (report == "Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                highscores.insert(url.query);
            }
        }
        _response.end();
    }
    async function retrieveOrders() {
        // console.log("Asking DB about Orders ", orders.find());
        let cursor = await highscores.find(); //cursor festlegen, mit dem auf ELemente gezeigt werden
        let answer = await cursor.toArray(); // Jeder Eintrag soll in einem Array gespeichert werden
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered technical problems. Please try again later";
    }
})(endabgabe = exports.endabgabe || (exports.endabgabe = {}));
//# sourceMappingURL=server.js.map