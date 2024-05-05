//src/middleware/contoh-middleware.js

export const contohMiddleware = async (req, res, next) => {
  //1. mengambil token dari request body 'Authorization'
  const token = req.get('Authorization');
  console.log("token :", token);


  switch (token) {
    case undefined:
      //2. If no token is provided, return a 401 Unauthorized response
      res.status(401).json({ errors: "Unauthorized : Token Tidak Ada" }).end();
      break;
    case "rahasia":
      //3a. If the token matches the secret, create a user object and proceed
      const user = { username: 'edy-dari-middleware' };
      console.log("user : ", user);
      // Attach the user object to the request object for later use
      req.user = user;
      //3b. Call the next middleware in the chain
      next();
      break;
    default:
      //4. If the token doesn't match the secret, return a 401 Unauthorized response
      res.status(401).json({ errors: "Unauthorized : Token Tidak Sesuai" }).end();
      break;
  }
}