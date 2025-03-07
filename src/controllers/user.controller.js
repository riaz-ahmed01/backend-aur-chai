import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  //  get user details from frontend  and save to database
  // validation  - not empty, email format, password length
  // hash password before saving
  // check if user already exists : email or username\

  // check for images ,check for avatar
  // upload image to cloudinary and save url to database
  // create user object - create entry in database
  // remove password and refresh token fields from response

  //  check for user creation and send response

  const { fullName, email, password, username } = req.body;
  console.log(fullName, email);
  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser);

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  console.log(avatarLocalPath);
  console.log(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar || !coverImage) {
    throw new ApiError(500, "Failed to upload image")
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username:username.toLowerCase(),
    avatar:avatar.url,
    coverImage:coverImage.url
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Failed to created user")
  }

  return res.status(201).json(new ApiResponse(201, createdUser,"User created successfully"))
});

export { registerUser };
