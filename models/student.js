import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  username:String,
  password:String
})

export default mongoose.model("students",studentSchema);