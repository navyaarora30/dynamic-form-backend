import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: {
      type: Object, 
      required: true,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
export default Response;
