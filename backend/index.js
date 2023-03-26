const express = require('express');
const app = express();
const PORT = 5000;
const mongoConnect = require('./db');
mongoConnect();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req,res)=>{
    res.send("Hello World!");
})
app.use(express.json());
app.use("/api",require("./routes/createUser"));
app.use("/api",require("./routes/displayData"));
app.use("/api",require("./routes/orderData"));
app.listen(PORT,()=>{
    console.log(`server is running at Port :${PORT}`)
})


 