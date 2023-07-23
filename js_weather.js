const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/html_weather.html");

    //res.send("Server is up & running.");
});

app.post("/",function(req,res){
    //console.log(req.body.cityName); //as "cityName" is name of the input box in "html_weather.html"
    //console.log("Post request recieved.");
    const query=req.body.cityName; //as "cityName" is name of the input box in "html_weather.html"
    const apiKey="8ce9a2243378da55604ebc194f16413f";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            //console.log(data);
            const weatherData=JSON.parse(data)
            //console.log(weatherData);
            /*const object={
                name:"Suvam",
                favouriteFood:"Rice"
            }
            console.log(JSON.stringify(object));*/
            const temp=weatherData.main.temp
            //console.log(temp);
            const weatherDescription=weatherData.weather[0].description
            //console.log(weatherDescription);
            const icon=weatherData.weather[0].icon
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send() //We can use 'res.send()' only once & it is treated as last statement of 'res'.
        })
    });
})

app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});