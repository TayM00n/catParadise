var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api', require("./routes/index"));
app.use('/api', require("./routes/users"));

// catch 404 and forward to error handler
app.use("/*", (req, res, next) => {
  next(createError(404));
});

async function start(){
  try{
    app.listen(port, (req, res) =>{
      console.log(`Server has been started on port: ${port}`);
    });
  }catch(e){
    console.log("Server error");
    process.exit(1);
  }
}

start();
