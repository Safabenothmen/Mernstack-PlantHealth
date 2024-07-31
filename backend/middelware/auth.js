
const jwt = require('jsonwebtoken');
//  module.exports = async (request, response, next) => {
//    try {
//      //   get the token from the authorization header
//     const token =  request.headers.authorization.split(" ")[1];
       
//      //check if the token matches the supposed origin
//      const decodedToken = jwt.verify(token,process.env.privitekey);
//      console.log(decodedToken)
//      // retrieve the user details of the logged in user
//      const user = await decodedToken;

//      // pass the user down to the endpoints here
//      request.user = user;

//      // pass down functionality to the endpoint
//      next();
    
//    } catch (error) {
//      response.status(401).json({
//        error: new Error("Invalid request!"),
//      });
//    }
//  };



//  module.exports= (req,res,next) =>{
//    const authToken = req.headers.authorization;
   
//    if(authToken){
//         const token = authToken.split(" ")[1];
//         try{
//            const decodedPlaylaod = jwt.verify(token,process.env.JWT_SECRET);
//            console.log(decodedPlaylaod)
//            req.user=decodedPlaylaod; 
//            next();
//          }catch(error){
//           console.error(error);
//            return res.status(401).json({message:"invalidToken"})
//         }
//    }else{
//        return res.status(401).json({message:"no token provided"})
//    }
//  }


const privateKey = 'my_secret_key'; // Replace with your actual private key
const secret = 'secret_key'


module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
   
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token,secret);
    req.user = decoded;
req.expert=decoded;    
    next();
  } catch (ex) {
    console.log(ex)
    res.status(400).send('Invalid token.');
  }
};
