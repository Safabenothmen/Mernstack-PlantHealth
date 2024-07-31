const  mongoose  = require("mongoose");

const mongoUrl =
  //"mongodb+srv://adarsh:adarsh@cluster0.zllye.mongodb.net/?retryWrites=true&w=majority";
"mongodb+srv://rabebbenothmen:rabeb1995@cluster0.hhvyvwh.mongodb.net/PFE?retryWrites=true&w=majority"
  
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));