import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Col, Input, Row } from "antd";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

function ManageProfile() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/api/user`);
      setName(data.name);
      setEmail(data.email);
      setContactNum(data.contactNum);
      setImage(data.image);
      setBio(data.bio);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/profile/updateprofile`, {
        name,
        email,
        contactNum,
        // password,
        // bio,
      });
      if (auth?.user?._id === data._id) {
        setAuth({ ...auth, user: data });
        let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
        fromLocalStorage.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
      }

      toast.success("Success");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  const handleBio = (e) => {
    setBio(e);
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

  return (
    <Layout>
      <AdminLayout>
        <Row>
          <Col span={14} offset={10}>
            <h4>Profile Update</h4>
          </Col>
          <Col span={12} offset={6}>
            <div style={{ marginBottom: 20, textAlign: "center" }}>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar src="/images/preview.ico" size={100} />
              {/* {media.selected ? (
            <>
            </>
          ) : image ? (
            <>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar src={image.url} size={100} />
            </>
          ) : (
            ""
          )} */}
            </div>

            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="contact Number"
              value={contactNum}
              onChange={(e) => setContactNum(e.target.value)}
            />
            {/* 
            <Input.Password
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}

            {/* <Editor
              apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
              
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
              onEditorChange={handleBio}
              name="bio"
              value={bio}
            /> */}

            <Button
              onClick={handleSubmit}
              type="primary"
              style={{ margin: "10px 0px 10px 0px" }}
              loading={loading}
              block
            >
              Submit
            </Button>
          </Col>
        </Row>
      </AdminLayout>
    </Layout>
  );
}

export default ManageProfile;
