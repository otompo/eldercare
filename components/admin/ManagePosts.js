import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { AuthContext } from "../../context/authContext";
import { Tooltip, Image, Modal, Avatar, Spin } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { MDBDataTable } from "mdbreact";
// import LoadingToRedirect from "../LoadingToRedirect";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

function ManagePosts(props) {
  const { confirm } = Modal;
  const [values, setValues] = useState({
    title: "",
    loading: false,
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // hooks
  useEffect(() => {
    loadPosts();
  }, [success]);

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/posts`, {
        title: values.title,
        content,
        featuredImage: image,
      });
      setImagePreview({});
      setValues({ ...values, title: "", loading: false });
      setSuccess(false);
      setIsModalVisible(false);
      toast.success("Success");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
      setSuccess(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { data } = await axios.get("/api/admin/posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get("/api/user/current");
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  // if (loading) {
  //   return <LoadingToRedirect />;
  // }

  const handleImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      // setUploadButtonText(reader.name);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setUploadButtonText("Upload Image");
      setImagePreview("Upload Image");
    }
  };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete this Post`,
        icon: <ExclamationCircleOutlined />,
        content: "It will be deleted permanentily if you click Yes",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          setValues({ ...values, loading: true });
          let allPosts = posts;
          const removed = allPosts.splice(index, 1);
          setPosts(allPosts);
          //   console.log(removed);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/posts/delete/${removed[0]._id}`
          );
          toast.success("Success");
          setValues({ ...values, loading: false });
        },
        onCancel() {
          return;
        },
      });
    } catch (err) {
      console.log(err.response.data.message);
      setValues({ ...values, loading: false });
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Created By",
          field: "createdBy",
          sort: "asc",
        },

        {
          label: "Created Date",
          field: "createdDate",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    posts &&
      posts.forEach((post, index) => {
        data.rows.push({
          key: index,
          image: (
            <Avatar
              src={
                <Image
                  src={post && post.featuredImage && post.featuredImage.url}
                  style={{ width: 32 }}
                  preview={false}
                />
              }
            />
          ),
          title: post.title,
          createdBy: post && post.postedBy && post.postedBy.name,
          createdDate: `${moment(post.createdAt).fromNow()}`,
          action: (
            <>
              <div className="row">
                <div className="col-md-6">
                  <Link href={`/admin/posts/${post.slug}`}>
                    <a>
                      <Tooltip title={`View ${post.title}`} color="green">
                        <EyeOutlined
                          className="text-success d-flex justify-content-center "
                          style={{ cursor: "pointer", fontSize: 25 }}
                        />
                      </Tooltip>
                    </a>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Tooltip title={`Delete ${post.title}`}>
                    <span
                      onClick={() => handleDelete(index)}
                      // className="pt-1 pl-3"
                    >
                      <DeleteOutlined
                        className="text-danger d-flex justify-content-center "
                        style={{ cursor: "pointer", fontSize: 25 }}
                      />
                    </span>
                  </Tooltip>
                </div>
              </div>
            </>
          ),
        });
      });

    return data;
  };

  const handleContent = (e) => {
    setContent(e);
  };

  return (
    <Layout title="Manage Posts">
      <AdminLayout>
        <div className="container-fluid m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Posts</h1>
            </div>
            <div className="col-md-6 offset-md-1">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                Add Post
              </p>
            </div>
          </div>
        </div>
        <hr />

        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        <Modal
          title="+ ADD POST"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          width={700}
        >
          <form
            className=" mb-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className="btn btn-dark btn-block text-left my-3 text-center"
                    style={{
                      width: imagePreview && imagePreview ? "50vh" : "100%",
                    }}
                  >
                    {uploadButtonText}
                    <input
                      type="file"
                      name="image"
                      size="large"
                      onChange={handleImage}
                      accept="image/*"
                      hidden
                    />
                  </label>
                </div>
              </div>

              <div className="col-md-2 offset-2">
                <div className="form-group">
                  {imagePreview ? (
                    <Avatar size={60} src={imagePreview} />
                  ) : (
                    <Avatar size={60} src="/images/preview.ico" />
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <Editor
                apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                // initialValue=""
                init={{
                  height: 400,
                  menubar: true,
                  selector: "textarea", // change this value according to your HTML
                  images_upload_url: "postAcceptor.php",
                  automatic_uploads: false,
                  images_reuse_filename: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],

                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleContent}
                name="content"
                value={content}
              />
            </div>
            {/* <div className="form-group">
              <select
                className="form-control"
                id="restaurants_type_field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option defaultValue>Select Category</option>
                {categories &&
                  categories.map((category, i) => (
                    <>
                      <option key={i} value={category._id}>
                        {category.name}
                      </option>
                    </>
                  ))}
              </select>
            </div> */}

            <button
              type="submit"
              className="btn btn-block btn-primary py-2"
              disabled={values.loading ? true : false}
            >
              {values.loading ? <Spin /> : "CREATE"}
            </button>
          </form>
        </Modal>
      </AdminLayout>
    </Layout>
  );
}

export default ManagePosts;
