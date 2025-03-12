import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, username } = req.body;

  // Validation for empty fields
  if (
    [fullName, email, password, username].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check for existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Debug logs for files
  console.log("req.files:", req.files);

  // Validate Avatar File
  if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatarLocalPath = req.files.avatar[0].path;
  const coverImageLocalPath = req.files.coverImage?.[0]?.path || null;

  // Upload Avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar to Cloudinary");
  }

  // Upload Cover Image (if provided)
  let coverImage = null;
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  // Create User
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Select User Details (excluding password and refreshToken)
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
