import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  username:String,
  time:String,
  date:String,
  bool:String,
  count:String
})

export default mongoose.model("schedules",scheduleSchema);