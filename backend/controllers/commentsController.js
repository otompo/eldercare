import Comment from "../models/commentModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const createComment = catchAsync(async (req, res) => {
  const { patientId } = req.query;
  const {
    comment,
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
  } = req.body;

  let newComment = await new Comment({
    content: comment,
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
    commentBy: req.user._id,
    patientId,
  }).save();
  newComment = await newComment.populate("commentBy", "name contactNum email");
  res.json(newComment);
});

export const userComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({ commentBy: req.user._id })
    .populate("commentBy", "name")
    .populate("patientId", "firstName lastName username")
    .sort({ createdAt: -1 });

  return res.json(comments);
});

export const updateComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.query;
  const {
    content,
    bodyTemperature,
    bloodPressure,
    respirationRate,
    pulseRate,
    weight,
    oxygen,
  } = req.body;

  const preComment = await Comment.findById({ _id: commentId });
  if (!preComment) {
    return next(new AppError("Comment not found", 404));
  }

  if (req.user._id != preComment.commentBy) {
    return next(new AppError("Access denied", 401));
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      content,
      bodyTemperature,
      bloodPressure,
      respirationRate,
      pulseRate,
      weight,
      oxygen,
    },
    { new: true }
  );
  res.json(updatedComment);
});

export const removeComment = catchAsync(async (req, res, next) => {
  const preComment = await Comment.findById({ _id: req.query.commentId });
  if (!preComment) {
    return next(new AppError("Comment not found", 404));
  }
  if (req.user._id != preComment.commentBy) {
    return next(new AppError("Access denied", 401));
  }
  const comment = await Comment.findByIdAndDelete(req.query.commentId);
  res.json({ ok: true });
});
