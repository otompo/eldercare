import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
// import LoadingToRedirect from "../LoadingToRedirect";
import moment from "moment";
import { Modal, Avatar, Image, Card, Tooltip, Spin } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import renderHTML from "react-render-html";

function ManageSinglePost(props) {
  const { confirm } = Modal;

  const router = useRouter();

  const { slug } = router.query;
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(true);
  const [loadedImage, setLoadImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

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
  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setOk(true);
      const { data } = await axios.put(`/api/admin/posts/update/${slug}`, {
        title,
        content,
        featuredImage: imagePreview,
      });
      setSuccess(false);
      setOk(false);
      toast.success("Success");
      setIsModalVisible(false);
    } catch (err) {
      console.log(err.response);
      setSuccess(false);
      setOk(false);
    }
  };

  const loadPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/single/${slug}`);
      setTitle(data.title);
      setContent(data.content);
      setCreatedAt(data.createdAt);
      setLoadImage(data.featuredImage.url);
      setImagePreview(data.featuredImage.url);
      setPostedBy(data.postedBy.name);
      setOk(false);
    } catch (err) {
      console.log(err.response);
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

  // if (loading) {
  //   return <LoadingToRedirect />;
  // }

  const handleContent = (e) => {
    setContent(e);
  };
  return (
    <Layout title={title}>
      <AdminLayout>
        <div className="container-fluid m-2">
          <div className="row my-4">
            <div className="col-md-6">
              <h4 className="lead uppercase">Manage {title} </h4>
            </div>
            <div className="col-md-3 offset-3">
              <Tooltip title={`Update ${title}`} color="blue">
                <button className="btn btn-success" onClick={showModal}>
                  UPDATE
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <Card
                cover={
                  <Avatar
                    shape="square"
                    style={{ height: "400px" }}
                    src={loadedImage}
                    alt={title}
                  />
                }
              >
                <h6 className="d-inline uppercase">
                  Posted By: <span className="lead">{postedBy}</span>
                </h6>{" "}
                <h6 className="d-inline">
                  Created Date:{" "}
                  <span className="lead">{moment(createdAt).format("ll")}</span>
                </h6>
                <hr />
                <p>{renderHTML(content)}</p>
              </Card>
            </div>
          </div>
        </div>

        <Modal
          title="UPDATE POST"
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            <button
              type="submit"
              className="btn btn-block btn-primary py-2"
              //   disabled={loading ? true : false}
            >
              {ok ? <Spin /> : "UPDATE"}
            </button>
          </form>
        </Modal>
        {/* <pre>{JSON.stringify(doctors, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageSinglePost;
