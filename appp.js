const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
// const city="London";
// const country="uk";
app.use(bodyparser.urlencoded({extended:true}));
app.post("/",function(req,res){
    console.log("post received");   
    const city=req.body.city;
    const country=req.body.country;
    const appid ="b5170ae41ba310b16db9f689125958d5";
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&units=metric&appid=b5170ae41ba310b16db9f689125958d5"
https.get(url,(response)=>{

console.log("Status Code :"+response.statusCode);
console.log("Status Messsage :"+response.statusMessage);
response.on('data',(data)=>
{
const weatherData=JSON.parse(data);
const Description =weatherData.weather[0].description
const temp=weatherData.main.temp; 
const icon=weatherData.weather[0].icon;
const urli=" http://openweathermap.org/img/wn/"+icon+"@2x.png"
res.write(`<h1> Weather seems to be ${Description}</h1>`);  
res.write("<h1>The temp in "+city+","+country+" is "+temp+" degree celcius </h1>");
res.write("<img src="+urli+">");
res.send();
})
})
})

//get method
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");

}
)

app.listen(2000,function(req,res){
    console.log("server is activated and running at 2000");
      
})

