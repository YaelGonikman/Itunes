const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be the data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it 
module.exports = mongoose.model("Data", DataSchema);
