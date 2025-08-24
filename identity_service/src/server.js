require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoutes = require('./Routes/user.route')


const port = process.env.PORT || 3001;
console.log("====>" , process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(()=> console.log('DB Connected')).catch((err)=> console.log(err))  

app.use(express.json())
app.use('/api/auth',userRoutes)




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})