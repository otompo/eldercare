import User from "../models/userModel";
import Patient from "../models/patientModel";
import Comment from "../models/commentModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import slugify from "slugify";
import cloudinary from "cloudinary";
import { signToken } from "../middlewares/auth";
import emaliValidator from "email-validator";
// cluodnary

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, contactNum, password, cf_password } = req.body;
  if (password !== cf_password) {
    return next(new AppError("Password  not do not match", 400));
  }
  if (!name) {
    return next(new AppError("Name is required", 400));
  }
  if (!email) {
    return next(new AppError("Email is required", 400));
  }
  if (!contactNum || contactNum < 10) {
    return next(new AppError("contact Number is required", 400));
  }

  if (!password || password.length < 6) {
    return next(
      new AppError("Password is required and should be 6 characters long", 400)
    );
  }

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return next(new AppError("Email is taken", 400));
  }
  const existContactNum = await User.findOne({ contactNum });
  if (existContactNum) {
    return next(new AppError("Contact Number is taken", 400));
  }

  const newUser = new User({
    name: name,
    email: email,
    contactNum: contactNum,
    password: bcrypt.hashSync(password),
    username: slugify(name) + `-${nanoid(5)}`,
  });

  const user = await newUser.save();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    contactNum: user.contactNum,
    role: user.role,
  });
});

export const signin = catchAsync(async (req, res, next) => {
  // console.log("CURRENT INSTRUCTOR => ", req.body);
  const user = await User.findOne({
    email: req.body.email,
    active: { $ne: false },
  }).select("+password +active");
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      user,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export const currentUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).select("-password").exec();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const currentAdmin = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).select("-password");
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes("admin")) {
    return next(new AppError("Not a admin", 400));
  } else {
    res.json({ ok: true });
  }
});
export const currentDoctor = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).select("-password");
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes("doctor")) {
    return next(new AppError("Not a doctor", 400));
  } else {
    res.json({ ok: true });
  }
});

export const currentNurse = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).select("-password");
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes("nurse")) {
    return next(new AppError("Not a nurse", 400));
  } else {
    res.json({ ok: true });
  }
});

export const readUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", active: { $ne: false } })
      .select("-password")
      .sort({ createdAt: -1 })
      .exec();
    return res.json(doctors);
  } catch (err) {
    console.log(err);
  }
};

export const getAllNurses = async (req, res) => {
  try {
    const doctors = await User.find({ role: "nurse", active: { $ne: false } })
      .select("-password")
      .sort({ createdAt: -1 })
      .exec();
    return res.json(doctors);
  } catch (err) {
    console.log(err);
  }
};

export const readSingleDoctor = catchAsync(async (req, res) => {
  const { username } = req.query;

  const doctor = await User.findOne({ role: "doctor", username }).select(
    "-generatedPasword"
  );

  const patients = await Patient.find({ doctor: doctor._id })
    .sort({
      createdAt: -1,
    })
    .populate("doctor", "name username contactNum");

  const comments = await Comment.find({ commentBy: doctor._id })
    .sort({
      createdAt: -1,
    })
    .populate("commentBy", "name username contactNum")
    .populate("patientId", "firstName lastName username");

  return res.json({ doctor, patients, comments });
});

export const readSingleNurse = catchAsync(async (req, res) => {
  const { username } = req.query;

  const nurse = await User.findOne({ role: "nurse", username }).select(
    "-generatedPasword"
  );

  const patients = await Patient.find({ nurse: nurse._id })
    .sort({
      createdAt: -1,
    })
    .populate("nurse", "name username contactNum");

  const comments = await Comment.find({ commentBy: nurse._id })
    .sort({
      createdAt: -1,
    })
    .populate("commentBy", "name username contactNum")
    .populate("patientId", "firstName lastName username");

  return res.json({ nurse, patients, comments });
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+active");
  user.name = req.body.name;
  user.email = req.body.email;
  user.bio = req.body.bio;
  user.contactNum = req.body.contactNum;
  await user.save();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    contactNum: user.contactNum,
    username: user.username,
    active: user.active,
    generatedPasword: user.generatedPasword,
  });
});

export const updateUserProfiles = catchAsync(async (req, res, next) => {
  const { name, email, contactNum, bio, password } = req.body;

  const user = await User.findById(req.user._id).select("+active +password");
  // console.log(req.body);
  // compare password
  // if (!bcrypt.compareSync(prevPassword, user.password)) {
  //   return next(new AppError("previous password is wrong", 401));
  // }

  // check password length
  if (password && password.length < 6) {
    return next(new AppError("Password should be 6 characters long", 500));
  }

  // check valid email
  if (!emaliValidator.validate(email)) {
    return next(new AppError("Invalid email", 401));
  }

  const exist = await User.findOne({ email });

  if (exist && exist._id.toString() !== user._id.toString()) {
    return next(new AppError("Email is taken", 401));
  }

  const hashedPassword = password ? await bcrypt.hashSync(password) : undefined;

  const token = signToken(user);
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    {
      username: slugify(name) + `${nanoid(5)}`,
      name: name || user.name,
      bio: bio || user.bio,
      email: email || user.email,
      contactNum: contactNum || user.contactNum,
      password: hashedPassword || user.password,
      generatedPasword: " ",
      // image: image || userFromDb.image,
    },
    { new: true }
  );
  res.json({ token, updated });

  // await user.save();
  // const token = signToken(user);
  // res.send({
  //   token,
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  //   bio: user.bio,
  //   contactNum: user.contactNum,
  //   username: user.username,
  //   active: user.active,
  //   generatedPasword: user.generatedPasword,
  // });
});

export const updateUserPassword = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.user._id).select("+password");
  const { prevPassword, newPassword, c_password } = req.body;
  // Check id the Posted current password is correct

  if (!bcrypt.compareSync(prevPassword, userData.password)) {
    return next(new AppError("previous password is wrong", 401));
  }

  if (c_password !== newPassword) {
    return next(new AppError("Password do not mach", 500));
  }

  if (!newPassword || newPassword.length < 6) {
    return next(new AppError("Password should be 6 characters long", 500));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      generatedPasword: "",
      password: bcrypt.hashSync(newPassword),
    },
    { new: true }
  );
  res.send(user);
});

export const getAllStaffs = catchAsync(async (req, res, next) => {
  const staff = await User.find({
    role: "admin",
    active: { $ne: false },
  })
    .select("-password")
    .sort({ createdAt: -1 })
    .exec();
  res.send(staff);
});

export const readSingleUser = catchAsync(async (req, res, next) => {
  let username = req.query.username;
  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.send(user);
});

// add staff
export const addUser = catchAsync(async (req, res, next) => {
  const { name, email, contactNum, role } = req.body;
  // console.log(req.body);
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return next(new AppError("Email is taken", 404));
  let password = nanoid(10).toLowerCase();
  const user = await new User({
    name: name,
    email: email,
    contactNum: contactNum,
    username: slugify(name) + `${nanoid(5)}`,
    role: role,
    password: bcrypt.hashSync(password),
    generatedPasword: password,
  }).save();
  // const token = signToken(user._id, user.email);
  res.status(201).json(user);
});

export const makeUserAdmin = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username }).exec();
  if (!user) return next(new AppError("User not found", 400));

  const roleUpdated = await User.findOneAndUpdate(
    { username },
    {
      $addToSet: { role: "admin" },
    },
    { new: true }
  ).exec();
  res.send(`${user.name}  is now an Admin `);
  // console.log(roleUpdated);
});

export const removeAsAdmin = catchAsync(async (req, res, next) => {
  const { username } = req.query;

  const user = await User.findOne({ username });

  if (!user) return next(new AppError("User not found", 400));

  const roleUpdated = await User.findOneAndUpdate(
    { username },
    {
      $pull: { role: "admin" },
    },
    { new: true }
  ).exec();
  res.send(`${user.name}  is remove as an Admin `);
});

//  make user an active
export const moveUserFromTrash = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const roleUpdated = await User.findOneAndUpdate(
    { username: user.username },
    {
      active: true,
    },
    { new: true }
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

// make un-active
export const moveUserToTrash = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const roleUpdated = await User.findOneAndUpdate(
    { username: user.username },
    {
      active: false,
    },
    { new: true }
  );
  res.send({ ok: true });
});

export const getAllStaffsInTrash = catchAsync(async (req, res, next) => {
  const staff = await User.find({ role: "admin", active: { $ne: true } });

  res.status(200).json({ total: staff.length, staff });
});

export const getAllDoctorsInTrash = catchAsync(async (req, res, next) => {
  const doctors = await User.find({ role: "doctor", active: { $ne: true } });

  res.status(200).json({ total: doctors.length, doctors });
});

export const getAllNursesInTrash = catchAsync(async (req, res, next) => {
  const nurses = await User.find({ role: "nurse", active: { $ne: true } });

  res.status(200).json({ total: nurses.length, nurses });
});
