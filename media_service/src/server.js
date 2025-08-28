require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const router = require("./route/route");
const {consumeEvent} = require('./service/rabbitMQ.service')
const {handleBlogDeleted} = require("./event-handler/deleteBlogEvent.event")
const port = process.env.PORT || 3003;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/media", router);
// app.use(errorHandler);

async function startServer() {
  try {
        await consumeEvent("post.deleted", handleBlogDeleted);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Error while exeucting handleBlogDeleted \n", error);
  }
}
startServer();
