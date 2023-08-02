// const fetch = require('node-fetch').default;
const axios = require("axios")
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

// app.use("/", (req, res) => {
//     res.json("hii")
// })

app.use(bodyParser.json())
app.use(cors())
app.post("/getData", async (req, res) => {
    // console.log(req)
    const options = req.body
    // console.log(options['cat']);
    const response = await getData(options['cat'],options['page'],options['pageSize']);
    res.json({response});
})

async function getData(cat,page,pagesize) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=00609756fdd54ad88cd4e1d4eefa99b9&page=${page}&pageSize=${pagesize}`;
    const res = await axios(url);
    return res.data
    
}
app.listen(5000, () => {
    console.log("Server started")
})