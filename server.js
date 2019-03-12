var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
const path = require('path');
var multer = require("multer")
var app = express();
var fs = require("fs");
var Request = require("request");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, file.fieldname + '-' + Date.now()+".jpeg")
  }
}) 

// app.use('/static', express.static('public'))

var upload = multer({ storage: storage })

app.get('/',function(req,res){  
  res.sendFile(__dirname+'/index.html');
   })

app.get("/api",function(req,res){
  // hello();
    
      Request.get("https://ip3zfz8atjg7.runkit.sh/",(err,result) => {
        // if(error) {
          if(err)
          {
            console.log(err)
            res.end();
          }
          if(result){
            console.log(result.body)
            res.write(result.body)
            res.end();
          }
            // return console.dir(error);
        // }
        // console.log(response)
        // console.dir(JSON.parse(body));
    });
    
//       hello();
// setTimeout(()=>{
  
//    res.write("?Hi")
//       res.end();
// },5000)
   
  })
  
var img;
var myarray=[];
app.get('/allimg',function(req,res){
 
  var _img = fs.readdirSync("./uploads/");
 for(var i in _img){
   console.log(i)
   console.log(_img[i],"*****************************************")
   img = _img[i]
   myarray.push(_img[i])
 }
//  res.writeHead(200,{'Content-type':'image/jpeg'});
      res.send(myarray)
      res.end()
 
  // fs.readFile("./uploads/"+img,function(err,result){
  //   if(err)
  //   console.log(err,"error on read file")
  //   if(result){
  //     console.log(result)
  //     res.writeHead(200,{'Content-type':'image/jpeg'});
  //     res.write(result)
  //     res.end()
  //   }
  // }) 

  
  // 
  // read_dir and image of copy of code
  // 
  // fs.readdir('./uploads/',function(err,data){
  // if(err)  
  // console.log("read dir err",err)
  // if(data){
  //   console.log(data)
  //   var d = data[0]
  //   console.log(d)
  //   fs.readFile("./uploads/sriram-1552037812192.jpeg",function(err,result){
  //     if(err)
  //     console.log(err,"error on read file")
  //     if(result){
  //       console.log(result)
  //       res.writeHead(200,{'Content-type':'image/jpeg'});
  //       res.end(result)
  //     }
  //   })
  //   // .res.end();
  //   // res.writeHead(200,{'Content-type':'image/jpeg'});
  //   // for(var i=0;i<data.length;i++){
  //     // res.write(data[]);
  //     // res.end(data[0]);
  //   // }
    
  // }
  // })
})

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   console.log(req.body)
// })

// var multer = require("multer");
// var storage = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null, 'uploads/'); // set the destination
//     },
//     filename: function(req, file, callback){
//         callback(null, Date.now() + '.jpg'); // set the file name and extension
//     }
// });
// var upload = multer({storage: storage});
app.post('/add', upload.single('sriram'), function(req, res, next) {
    // var image = req.file.filename;
    console.log(req.body);
    console.log(req.file.originalname);
    res.send("stored")

   /** rest */ 
});

var port = process.env.PORT || 5000
app.listen(port)
console.log(port)

