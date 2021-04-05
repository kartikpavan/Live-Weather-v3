const express=require("express");
const https=require("https");
const app=express();


app.set("view engine","ejs");
app.use(express.static("Public"));
app.use(express.urlencoded({extended:true}));


app.get("/",function(req,res){
   
    res.render("home", { temp:null,imageURL:null,weatherDesc:null,query:null,date:null});
})

app.post("/",function(req,res){

    const query=req.body.cityName;
    const apikey="1025c3c49d2ff355b6934112fb8316e5";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp=Math.round(weatherdata.main.temp);
        const weatherDesc=weatherdata.weather[0].description;
        const weatherIcon=weatherdata.weather[0].icon;
        const imageURL="https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
        
        var today=new Date();
        var options = { weekday: 'long',  // got the idea from stack overflow!
                        
                        month: 'long', 
                        day: 'numeric' };
    
        date=today.toLocaleDateString("en-US",options); // Saturday, September 17, 2016
     
        res.render("home",{temp,weatherDesc,imageURL,query,date});


        })

    })
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server running on PORT 3000")
});