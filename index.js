import express  from "express";
import dotenv from "dotenv";
import Cors from "cors";
import mongoose from "mongoose";
import Alumini from "./models/alumini.js";
import Student from "./models/student.js";
import Schedule from "./models/schedule.js";
const app = express()

app.use(express.json())
app.use(Cors())
dotenv.config()


mongoose.connect(process.env.DB_URI,{
   useNewUrlParser: true 
}).then(()=>{
  console.log("DB CONNECTED");
}).catch((e)=>{
  console.log(e);
})

const port = process.env.PORT || 9000

app.post("/student",(req,res)=>{
  Student.create(req.body,(err,result)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(201).send(result)
    }
  })
})

app.post("/schedule",(req,res)=>{
  Schedule.findOne({username:req.body.username},(err,result)=>{
    if(err){
      res.status(500).send(err)
    }
    if(!result){
      Schedule.create(req.body,(err,result)=>{
        if(err){
          res.status(500).send(err)
        }
        else{
          res.status(201).send(result)
        }
      })
      console.log(result);
    }
    else{
        console.log(result.count);
          if(result.count === "2"){
            return
          }else{
            Schedule.updateOne({username:result.username},{
              $set:{
                count:"2"
              }
            }).then((result)=>{
              console.log(result);
            }).catch(e=>{
              console.log(e);
            })
            Schedule.create(req.body)
          }
        
     
    }
  })
  
})


app.get("/sync-schedule",(req,res)=>{
  Schedule.find((err,result)=>{
    if(err){
      res.status(404).send(err)
    }else{
      res.status(200).send(result)
    }
  })
})


app.put("/change-schedule",(req,res)=>{
  const body = req.body
  Schedule.updateOne({username:body.data.username},{
    $set:{
      bool:"true"
    }
  }).then((result)=>{
    console.log(result)
  }).catch(e=>{
    console.log(e)
  })
  console.log(body.data)
})


app.post("/alumini",(req,res)=>{
  Alumini.create(req.body,(err,result)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(201).send(result)
    }
  })
})


app.listen(port,()=>{
  console.log("Localhost listening on",port);
})