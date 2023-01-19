const express = require('express');
const app = express();
const fs = require('fs');

app.get('/cities', function (req, res) {
res.send(JSON.parse(fs.readFileSync("./cities.json"), "utf8"));
});


 const findCity = (cities, requestedCity) => {
    let foundCities = cities.filter(city => city.toLowerCase().startsWith(requestedCity));
    let isCityFound = foundCities.length > 0;

    if(isCityFound) {
        return foundCities.length < 5 ? foundCities : foundCities.slice(0,5);
    }else {
        return "<h1> No cities found</h1>"
    }   
} 


app.get('/cities/:city', function (req, res) {
    let rawData = JSON.parse(fs.readFileSync("./cities.json"), "utf8");
    let requestedCity = req.params.city;
    let cities = rawData.map((data)=> data.name)
    res.send((findCity(cities, requestedCity)));
});

app.use(function(req, res, next){
    res.status(404).send('Page Not Found');
  });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});


