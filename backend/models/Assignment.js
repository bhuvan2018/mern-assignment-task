import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Assignment", AssignmentSchema);