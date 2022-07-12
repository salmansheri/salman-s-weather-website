const express = require("express");
const https = require("https");
const body = require("body-parser");
const app = express();
app.use(body.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
  });

app.post("/", function(req,res) {
  console.log("post request ");
  var place = req.body.city;
  var apiKey = "c7c1549c799f6fbffb884c6e181f2fa7";
  var units = "metric"
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data){
          var weatherData = JSON.parse(data);
          console.log(weatherData);
          var temp = weatherData.main.temp;
          console.log(temp);
          var temp2 = weatherData.main.feel_like;
          console.log(temp2);
          var temp3 = weatherData.main.humidity;
          console.log(temp3);
          var temp4 = weatherData.weather[0].description;
          console.log(temp4);
          var icon = weatherData.weather[0].icon;
          var imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
          res.write("<h1>The temperature in "+ place +" is " + temp + " degrees Celsius</h1>");
          res.write("<h2>weather in "+ place +" is " + temp4  + "</h2>");

          res.write("<img src=" + imageUrl + ">");

          res.send();


      } );

  })
})


app.listen(3000, function() {
    console.log("server is running in port 3000")

});
