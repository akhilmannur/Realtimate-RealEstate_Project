import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    isRead:{ type: Boolean,default: false},
    enquiryType: {
      type: String,
      required: true,
      enum: ["complaint", "genaralenquiry"],
    },
    message: { type: String, required: true },
    userRef: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactUs", ContactUsSchema);
