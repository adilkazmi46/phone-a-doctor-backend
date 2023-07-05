import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dygnosisSchema = new Schema({
  dygnosis: {
    type: String,
    required: true,
  },
});

const Dygnosis = mongoose.model("Dygnosis", dygnosisSchema);

export default Dygnosis;
