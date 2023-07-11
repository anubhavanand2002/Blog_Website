import mongoose from "mongoose";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find().populate("userId");
    if (!allBlogs.length) {
      return res
        .status(201)
        .json({ status: false, message: "No Blogs Found!!" });
    }
    return res.status(200).json({
      status: true,
      message: `${allBlogs.length}  Blogs Found!!`,
      allBlogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};

export const addBlog = async (req, res) => {
  const { title, description, image, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(201).json({
        status: false,
        message: `Unable to find the user with the UserId ${userId}`,
      });
    }
    const newBlog = new Blog({ title, description, image, userId });
    await newBlog.save();
    user.blogs.push(newBlog);
    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "Blogs Added Sucessfully!!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};

export const updateBlog = async (req, res) => {
  const { title, description,image } = req.body;
  console.log(req.body);
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
      image: image,
    });
    if (!blog) {
      return res
        .status(400)
        .json({ status: false, message: "Unable to update the blog" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Blog Updated Successfully!!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};

export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(blogId).populate("userId");
    if (!blog) {
      return res.status(201).json({
        status: false,
        message: "Unable to delete the blog",
      });
    }
    await blog.userId.blogs.pull(blog);
    await blog.userId.save();
    return res
      .status(200)
      .json({ status: true, message: "Blog deleted successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};

export const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(201).json({
        status: false,
        message: "Blog Not Found with the particular id!!!",
      });
    }
    return res.status(200).json({ status: true, message: blog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};

export const getBlogByUserId = async (req, res) => {
  const userid = req.params.id;
  try {
    const userBlogs = await User.findById(userid).populate("blogs");
    if (!userBlogs) {
      return res.status(400).json({
        status: false,
        message: "Not Found any Blogs corresponding to the given User_id ",
      });
    }
    return res.status(200).json({ status: true, message: userBlogs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error!!!" });
  }
};
