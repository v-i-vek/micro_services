require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");


const router = require('./route/route')
const port = process.env.PORT || 3003;
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err));



app.use(express.json());
app.use("/api/media", router);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
