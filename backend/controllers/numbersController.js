import Patient from "../models/patientModel";
import User from "../models/userModel";
import Post from "../models/postModel";

export const getNumbers = async (req, res) => {
  try {
    const posts = await Post.countDocuments();
    const doctors = await User.countDocuments({ role: "doctor" });
    const nurses = await User.countDocuments({ role: "nurse" });
    const staff = await User.countDocuments({ role: "admin" });
    const trash = await User.countDocuments({ active: { $ne: true } });
    const patients = await Patient.countDocuments();
    return res.json({ posts, doctors, nurses, patients, staff, trash });
  } catch (err) {
    console.log(err);
  }
};
