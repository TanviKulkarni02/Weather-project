const bodyParser = require("body-parser");
const { response } = require("express");
const express= require("express");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html")              // Our browser is making the get request -->
});

app.post("/",function(req,res){
    const query = req.body.cityname;                    // This we have done with the body parser
    const apikey = "9b4fbd873e4c73c24416c8b9b7842a31";
    const unit = "metric";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    
    https.get(url,function(response){                 // get request to get the data from the openWeather server
        console.log(response.statusCode);             //this will be our status code --> 
        
        response.on("data",function(data){            //we will get the data with the help of on function
            const weatherData = JSON.parse(data);    // here we have created the json object, that is weatherData.
            const temp = weatherData.main.temp;      // retrieve the the temp data from the API.
            const weatherDescription = weatherData.weather[0].description;  //retrive the description 

            //fetching the icon  -->
            const icon = weatherData.weather[0].icon;   // taken the icon id
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;

            //res.send("<h1>The temperature in indore is  " + temp + "degrees celcius.</h1>");          
            // we have only one res.send but we have multiple res.write -->

            res.write("<p>The weather is currently " +  weatherDescription +" </p>"); // writing the html into client browser..
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius</h1>"); // writing the html into client browser. 
            res.write("<img src=" + imageURL + ">");
            res.send();
            // res.send("Server is up and running");
        });
    });
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});