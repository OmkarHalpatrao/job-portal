import Users from "../models/userModel.js";
import mongoose from "mongoose";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //validate fileds

  if (!firstName) {
    next("First Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!lastName) {
    next("Last Name is required");
  }
  if (!password) {
    next("Password is required");
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
    }

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
    });

    // user token
    const token = await user.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
      },
      token,
    });
    toast.success("User Account created succesfully")
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      next("Please Provide AUser Credentials");
      toast.error("Please Provide User Credentials")
      return next("Please Provide AUser Credentials");
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid -email or password");
      return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
    }

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      next("Invalid email or password");
      return next("Invalid email or password");
    }

    user.password = undefined;

    const token = user.createJWT();

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
  }
};

