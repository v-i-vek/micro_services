require("dotenv").config();
const express = require("express");
const app = express();
const proxy = require("express-http-proxy");

const { validateToken } = require("./middleware/validate.token");
// Add body parser middleware

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  try {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    next();
  } catch (error) {
    console.error("Middleware error:", error);
    next(error);
  }
});

const proxyOption = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, res, next) => {
    console.log(err);
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};

// for authorization

app.use('/v1/hello',(req,res,next)=>{
  return res.status(200).json({
        success:true,
        message:"welcome to our API"
  })
})
app.use(
  "/v1/auth",
  proxy("http://localhost:3001/api/auth", {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReq, srcReq) => {
      proxyReq.headers["Content-Type"] = "application/json";
      return proxyReq;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        "Response Recieved from Identity service : ",
        proxyRes.statuscode
      );
      return proxyResData;
    },
  })
);

// for blog_service
app.use(
  "/v1/blog",
  validateToken,
  proxy("http://localhost:3002/api/blog", {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReq, srcReq) => {
      proxyReq.headers["Content-Type"] = "application/json";
      proxyReq.headers["x-user-id"] = srcReq.user.id;

      return proxyReq;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        "Response Recieved from blog service : ",
        proxyRes.statuscode
      );
      return proxyResData;
    },
  })
);

app.use(
  "/v1/media",
  validateToken,
  proxy("http://localhost:3003/api/media", {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReq, srcReq) => {
      proxyReq.headers["x-user-id"] = srcReq.user.id;
       if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
        proxyReq.headers["Content-Type"] = "application/json";
      }

      return proxyReq;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        "Response Recieved from media service : ",
        proxyRes.statuscode
      );
      return proxyResData;
    },
  })
);

app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
