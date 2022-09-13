import Patient from "../models/patientModel";
import Comment from "../models/commentModel";
import User from "../models/userModel";
import cloudinary from "cloudinary";
import { nanoid } from "nanoid";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import slugify from "slugify";

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const createPatient = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    contactNum,
    address,
    city,
    postCode,
    country,
    county,
    niNumber,
    efullName,
    relationship,
    cellPhone,
    insuranceCarrier,
    insurancePlan,
    insuranceContact,
    policyNumber,
    groupNumber,
    socialSecurityNumber,
    organization,
    primarycarephysician,
    dateofbirth,
    healthConcern,
    maritalstatus,
    check,
    image,
    doctor,
    gender,
    symptoms,
    nurse,
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
  } = req.body;

  // console.log(req.body);
  // return;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "legacygrace",
  });

  const patient = await new Patient({
    username: slugify(firstName) + `${nanoid(5)}`,
    firstName,
    lastName,
    email,
    contactNum,
    address,
    city,
    postCode,
    country,
    county,
    niNumber,
    efullName,
    relationship,
    cellPhone,
    insuranceCarrier,
    insurancePlan,
    insuranceContact,
    policyNumber,
    groupNumber,
    socialSecurityNumber,
    organization,
    primarycarephysician,
    dateofbirth,
    healthConcern,
    maritalstatus,
    doctor,
    nurse,
    symptoms,
    gender,
    check,
    image: {
      public_id: result.public_id,
      url: result.url,
    },
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
  }).save();

  res.status(201).json(patient);
});

export const updatePatient = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const {
    firstName,
    lastName,
    email,
    image,
    doctor,
    nurse,
    symptoms,
    contactNum,
    city,
    address,
    postCode,
    country,
    county,
    niNumber,
    efullName,
    relationship,
    cellPhone,
    insuranceCarrier,
    insurancePlan,
    insuranceContact,
    policyNumber,
    groupNumber,
    socialSecurityNumber,
    organization,
    primarycarephysician,
    gender,
    dateofbirth,
    check,
    healthConcern,
    maritalstatus,
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
  } = req.body;

  const prevData = await Patient.findOne({ username });

  if (image) {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "legacygrace",
    });
    await cloudinary.v2.uploader.destroy(prevData.image.public_id);
    const update = await Patient.findOneAndUpdate(
      { username },
      {
        username: slugify(firstName).toLowerCase(),
        firstName,
        lastName,
        email,
        doctor,
        nurse,
        symptoms,
        contactNum,
        city,
        address,
        postCode,
        country,
        county,
        niNumber,
        efullName,
        relationship,
        cellPhone,
        insuranceCarrier,
        insurancePlan,
        insuranceContact,
        policyNumber,
        groupNumber,
        socialSecurityNumber,
        organization,
        primarycarephysician,
        doctor,
        gender,
        dateofbirth,
        check,
        healthConcern,
        maritalstatus,
        image: {
          public_id: result.public_id,
          url: result.url,
        },
        bodyTemperature,
        bloodPressure,
        respirationRate,
        pulseRate,
        weight,
        oxygen,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  } else {
    const update = await Patient.findOneAndUpdate(
      { username },
      {
        username: slugify(firstName).toLowerCase(),
        firstName,
        lastName,
        email,
        doctor,
        symptoms,
        nurse,
        contactNum,
        city,
        postCode,
        country,
        county,
        niNumber,
        address,
        efullName,
        relationship,
        cellPhone,
        insuranceCarrier,
        insurancePlan,
        insuranceContact,
        policyNumber,
        groupNumber,
        socialSecurityNumber,
        organization,
        primarycarephysician,
        check,
        healthConcern,
        maritalstatus,
        bodyTemperature,
        bloodPressure,
        respirationRate,
        pulseRate,
        weight,
        oxygen,
        weight,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  }
});

export const getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find({})
    .populate("doctor", "_id name username contactNum email")
    .populate("nurse", "_id name username contactNum email")
    .populate("symptoms", "_id slug name")
    .sort({ createdAt: -1 });
  res.send(patients);
});

export const readPatient = catchAsync(async (req, res) => {
  const { username } = req.query;
  const patient = await Patient.findOne({ username })
    .populate("doctor", "_id name username contactNum email")
    .populate("nurse", "_id name username contactNum email")
    .populate("symptoms", "_id slug name");
  const comments = await Comment.find({ patientId: patient._id })
    .populate("commentBy", "name username")
    .sort({ createdAt: -1 });

  return res.json({ patient, comments });
});

export const assignADoctor = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const { doctor } = req.body;
  const user = await Patient.findOne({ username }).exec();
  if (!user) return next(new AppError("User not found", 400));

  const updated = await Patient.findOneAndUpdate(
    { username },
    {
      $addToSet: { doctor: doctor },
    },
    { new: true }
  ).exec();
  res.send(updated);
  // console.log(roleUpdated);
});
export const assignANurse = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const { nurse } = req.body;
  const user = await Patient.findOne({ username }).exec();
  if (!user) return next(new AppError("User not found", 400));

  const updated = await Patient.findOneAndUpdate(
    { username },
    {
      $addToSet: { nurse: nurse },
    },
    { new: true }
  ).exec();
  res.send(updated);
  // console.log(roleUpdated);
});

export const removeAssignDoctor = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const { doctor } = req.body;

  const patient = await Patient.findOne({ username });

  if (!patient) return next(new AppError("User not found", 400));

  const updated = await Patient.findOneAndUpdate(
    { username },
    {
      $pull: { doctor: doctor },
    },
    { new: true }
  ).exec();
  res.send(updated);
});

export const removeAssignNurse = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const { nurse } = req.body;

  const patient = await Patient.findOne({ username });

  if (!patient) return next(new AppError("User not found", 400));

  const updated = await Patient.findOneAndUpdate(
    { username },
    {
      $pull: { nurse: nurse },
    },
    { new: true }
  ).exec();
  res.send(updated);
});

export const relatedPatients = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password").exec();

  let doctorId = user._id;
  const patients = await Patient.find({ doctor: doctorId })
    .populate("doctor", "_id name username  contactNum email")
    .sort({ createdAt: -1 });

  const comments = await Comment.find({ commentBy: doctorId })
    .sort({
      createdAt: -1,
    })
    .populate("commentBy", "name username contactNum")
    .populate("patientId", "firstName lastName image username ");

  res.send({ patientsCount: patients.length, patients, comments });
});

export const relatedNursePatients = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password").exec();

  let nurseId = user._id;
  const patients = await Patient.find({ nurse: nurseId })
    .populate("nurse", "_id name username  contactNum email")
    .sort({ createdAt: -1 });

  const comments = await Comment.find({ commentBy: nurseId })
    .sort({
      createdAt: -1,
    })
    .populate("commentBy", "name username contactNum")
    .populate("patientId", "firstName lastName image username ");

  res.send({ patientsCount: patients.length, patients, comments });
});

export const relatedPatient = catchAsync(async (req, res, next) => {
  let username = req.query.username;

  const doctor = await User.findOne({ username, role: "doctor" });

  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  let doctorId = doctor._id;
  const patients = await Patient.find({ doctor: doctorId })
    .populate("doctor", "_id name username  contactNum email")
    .sort({ createdAt: -1 });

  res.send({ patientsCount: patients.length, patients });
});
