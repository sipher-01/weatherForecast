const express = require("express")
const https = require("https")
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
 app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html")
   
 })

 app.post("/",(req,res)=>{
    const query = req.body.cityname
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=aa9adba75a8d8d900eddd69b9ae4fa07"
    https.get(url,(response)=>{
      response.on("data",(data)=>{
        const weatherToday=JSON.parse(data)
        const temp = weatherToday.main.temp
        const desc = weatherToday.weather[0].description
        const icon = weatherToday.weather[0].icon 
        
        const image = `http://openweathermap.org/img/wn/${icon}@2x.png`
        res.write(`<h1>the temperature in ${query} is ${temp} degre celcius</h1>`)
        res.write(`<h2>weather : ${desc}</h2>`)
        res.write(`<img src=${image} />` )
        res.send()
      })
    })
 })
 app.listen(3000,()=>{
    console.log("working")
 })