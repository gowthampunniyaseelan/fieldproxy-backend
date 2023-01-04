import mongoose from "mongoose";

const aluminiSchema = mongoose.Schema({
  username:String,
  password:String
})

export default mongoose.model("alumini",aluminiSchema);