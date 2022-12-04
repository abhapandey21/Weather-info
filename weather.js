const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    const cityName = req.body.cityname;


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fdcb7f943d40ba43d4eb059a54dd1694`
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(`<p>current temperature of ${cityName} is ${temp} celsius.</p>`)
            res.write("<img src=" + imageurl + " />");
            res.send();
        });
    });
    console.log("Post request received.")
});
app.listen(3000, function () {
    console.log("I am on port 3000");
});