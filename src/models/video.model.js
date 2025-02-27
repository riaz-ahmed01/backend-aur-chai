import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avtar:{
        type:String, // cloudinary url
        required:true,
    },
    coverImage:{
        type:String, // cloudinary url
        required:true,
    }
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
