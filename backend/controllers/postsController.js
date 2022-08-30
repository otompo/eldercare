import Post from "../models/postModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import cloudinary from "cloudinary";
import slugify from "slugify";
import APIFeatures from "../utils/apiFeatures";

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const createPost = catchAsync(async (req, res, next) => {
  const { title, content, featuredImage } = req.body;
  // console.log(req.body);
  let slug = slugify(title).toLowerCase();
  // check if title is taken
  const alreadyExist = await Post.findOne({
    slug,
  });

  if (alreadyExist) {
    return next(new AppError("Title is taken", 400));
  }
  const result = await cloudinary.v2.uploader.upload(featuredImage, {
    folder: "legacygrace",
  });
  // save post
  setTimeout(async () => {
    try {
      const post = await new Post({
        ...req.body,
        slug: slugify(title),
        postedBy: req.user._id,
        content,
        featuredImage: {
          public_id: result.public_id,
          url: result.url,
        },
      }).save();
      return res.json(post);
    } catch (err) {
      console.log(err);
    }
  }, 1000);
});

export const updatePost = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const { title, content, featuredImage } = req.body;

  const prepost = await Post.findOne({ slug });
  if (featuredImage) {
    const result = await cloudinary.v2.uploader.upload(featuredImage, {
      folder: "legacygrace",
    });
    await cloudinary.v2.uploader.destroy(prepost.featuredImage.public_id);
    const update = await Post.findOneAndUpdate(
      { slug },
      {
        slug: slugify(title).toLowerCase(),
        title,
        content,
        featuredImage: {
          public_id: result.public_id,
          url: result.url,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  } else {
    const update = await Post.findOneAndUpdate(
      { slug: prepost.slug },
      {
        slug: slugify(title).toLowerCase(),
        title,
        content,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  }
});

export const getAllPosts = catchAsync(async (req, res, next) => {
  const resPerPage = 12;

  const apiFeatures = new APIFeatures(
    Post.find({ published: true }).sort({ publishedDate: -1 }),
    req.query
  ).search();

  apiFeatures.pagination(resPerPage);
  // .populate("postedBy", "name")
  // .sort({ publishedDate: -1 });
  let posts = await apiFeatures.query;
  let total = posts.length;

  res.json({ total, posts, resPerPage });
});

export const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

export const getAllAdminPosts = catchAsync(async (req, res, next) => {
  const all = await Post.find()
    .populate("postedBy", "name")
    .sort({ createdAt: -1 });
  res.json(all);
});

export const readSinglePost = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const post = await Post.findOne({ slug }).populate("postedBy", "name");
  res.json(post);
});

export const userPosts = catchAsync(async (req, res, next) => {
  const all = await Post.find({ postedBy: req.user._id })
    .populate("postedBy", "name")
    .sort({ createdAt: -1 });
  res.json(all);
});

// export const postsForAdmin = catchAsync(async (req, res) => {
//   const posts = await Post.find({});
//   res.json(posts);
// });

export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.query.postId);
  await cloudinary.v2.uploader.destroy(post.featuredImage.public_id);
  res.json({ ok: true });
});

export const publishBlog = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const blog = await Post.findOne({ slug }).select("postedBy");

  // if (blog.postedBy._id != req.user._id) {
  //   return next(new AppError("Unauthorized", 400));
  // }

  const updated = await Post.findOneAndUpdate(
    { slug },
    { published: true, publishedDate: new Date() },
    { new: true }
  );
  res.send({ ok: true });
});

export const unpublishBlog = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const blog = await Post.findOne({ slug }).select("postedBy");
  // if (blog.postedBy._id != req.user._id) {
  //   return next(new AppError("Unauthorized", 400));
  // }
  const updated = await Post.findOneAndUpdate(
    { slug },
    { published: false },
    { new: true }
  );
  res.send({ ok: true });
});
