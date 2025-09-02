const express = require('express')
const app = express();
const proxy = require("express-http-proxy");

// Add body parser middleware

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  try {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
 
    next();
  } catch (error) {
    console.error('Middleware error:', error);
    next(error);
  }
});

const proxyOption = {
  proxyReqPathResolver: (req) => {
    console.log("proxyOpion")
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

app.use("/v1/auth", proxy('http://localhost:3001/api/auth', {
  ...proxyOption,
  proxyReqOptDecorator: (proxyReq, srcReq) => {
    console.log(srcReq.originalUrl)
    proxyReq.headers["Content-Type"] = 'application/json'
    return proxyReq
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    console.log("Response Recieved from Identity service : ", proxyRes.statuscode)
    return proxyResData
  }
}))

// app.use("/api/blog", proxy('http://localhost:3002/api/blog', {

// }))

// app.use("/api/blog", proxy('http://localhost:3002/api/auth', {
//   ...proxyOption,
//   proxyReq
// ype"] = 'application/json'
//     return proxyReq
//   },
//   userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//     console.log("Response Recieved from blog service : ", proxyRes.statuscode)
//     return proxyResData
//   }
// }))



app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`)
})



