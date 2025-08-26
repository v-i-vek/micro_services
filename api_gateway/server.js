const express  = require('express')
const app = express();
const proxy = require("express-http-proxy");




const port = 3000;

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  console.log(`Request body, ${req.body}`);
  next();
});

const proxyOption = {
    proxyReqPathResolver:(req)=>{
        return req.originalUrl.replace(/^\/v1/, "/api")
    },
     proxyErrorHandler: (err, res, next) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};  

app.use("/api/auth",proxy('http://localhost:3001/api/auth',{
    ...proxyOption,
    proxyReqOptDecorator:(proxyReq,srcReq)=>{
        proxyReq.headers["Content-Type"] = 'application/json'
        return proxyReq
    },
    userResDecorator:(proxyRes,proxyResData,userReq,userRes)=>{
        console.log("Response Recieved from Identity serice : ", proxyRes.statuscode)
        return proxyResData
    }
}))

app.use("/api/blog",proxy('http://localhost:3002/api/auth',{
  ...proxyOption,
  proxyReqOptDecortor:(proxyReq,srcReq)=>{
    proxyReq.headers["Content-Type"] = 'application/json'
    return proxyReq
  },
  userResDecorator:(proxyRes,proxyResData,userReq,userRes)=>{
      console.log("Response Recieved from blog service : ", proxyRes.statuscode)
        return proxyResData
  }
}))



app.listen(port , ()=>{
    console.log(`API Gateway is running on port ${port}`)
})



