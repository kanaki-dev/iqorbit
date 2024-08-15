import { model, Schema } from "mongoose";

const optonSchema = new Schema(
  {
    optId: {
      type: String,
      required: true,
    },
    optName: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const aptitudes = new Schema({
  label: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  options: [optonSchema],
  answer: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});

export const Aptitudes = model("Aptitude", aptitudes);
