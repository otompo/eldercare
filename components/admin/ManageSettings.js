import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { AuthContext } from "../../context/authContext";
import { Tabs, Row, Col, Button, Input, Card, Avatar } from "antd";
// import LoadingToRedirect from "../LoadingToRedirect";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import axios from "axios";
import useAbout from "../../hooks/useAbout";
import useHero from "../../hooks/useHero";
import useAmount from "../../hooks/useAmount";
import useCallToAction from "../../hooks/useCallToAction";
import useFooter from "../../hooks/useFooter";
import usePolicy from "../../hooks/usePolicy";

const { TabPane } = Tabs;
const { TextArea } = Input;

function ManageSettings(props) {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [fullImagePreview, setFullImagePreview] = useState("");
  const [fullUploadButtonText, setFullUploadButtonText] =
    useState("Upload Full Image");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const {
    mainContent,
    missionTitle,
    missionContent,
    visionTitle,
    visionContent,
    setMainContent,
    setMissionTitle,
    setMissionContent,
    setVisionTitle,
    setVisionContent,
  } = useAbout();

  const {
    title,
    slogan,
    content,
    fullwithImage,
    image,
    setTitle,
    setSlogan,
    setContent,
    setFullwithImage,
    setImage,
  } = useHero();

  const {
    mainTitle,
    titleOne,
    contentOne,
    titleTow,
    contentTow,
    titleThree,
    contentThree,
    titleFour,
    contentFour,
    callSlogan,
    setCallSlogan,
    setMainTitle,
    setTitleOne,
    setContentOne,
    setTitleTow,
    setContentTow,
    setTitleThree,
    setContentThree,
    setTitleFour,
    setContentFour,
  } = useCallToAction();

  const {
    addressTitle,
    location,
    email,
    contactNum,
    quickLinkTitle,
    socialTitle,
    facebook,
    twitter,
    instagram,
    facebookLink,
    twitterLink,
    instagramLink,
    setAddressTitle,
    setLocation,
    setEmail,
    setContactNum,
    setQuickLinkTitle,
    setSocialTitle,
    setFacebook,
    setTwitter,
    setInstagram,
    setFacebookLink,
    setTwitterLink,
    setInstagramLink,
  } = useFooter();

  const { policyTitle, policyContent, setPolicyTitle, setPolicyContent } =
    usePolicy();

  const { amount, setAmount } = useAmount();

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  const handleAboutSubmit = async () => {
    try {
      const { data } = await axios.post("/api/website/about", {
        about: "about",
        mainContent,
        missionTitle,
        missionContent,
        visionTitle,
        visionContent,
      });
      toast.success("Saved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleHeroSubmit = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.post("/api/website/hero", {
        hero: "hero",
        title,
        slogan,
        content,
        fullwithImage,
        image,
      });
      toast.success("Saved");
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const handleCallToActionSubmit = async () => {
    try {
      // setSuccess(true);
      const { data } = await axios.post("/api/website/calltoaction", {
        calltoaction: "calltoaction",
        mainTitle,
        titleOne,
        callSlogan,
        contentOne,
        titleTow,
        contentTow,
        titleThree,
        contentThree,
        titleFour,
        contentFour,
      });
      toast.success("Saved");
      // setSuccess(false);
    } catch (err) {
      console.log(err);
      // setSuccess(false);
    }
  };
  const handlePolicySubmit = async () => {
    try {
      // setSuccess(true);
      const { data } = await axios.post("/api/website/policy", {
        policy: "policy",
        policyTitle,
        policyContent,
      });
      toast.success("Saved");
      // setSuccess(false);
    } catch (err) {
      console.log(err);
      // setSuccess(false);
    }
  };
  const handleFooterSubmit = async () => {
    try {
      // setSuccess(true);
      const { data } = await axios.post("/api/website/footer", {
        footer: "footer",
        addressTitle,
        location,
        email,
        contactNum,
        quickLinkTitle,
        socialTitle,
        facebook,
        twitter,
        instagram,
        facebookLink,
        twitterLink,
        instagramLink,
      });
      toast.success("Saved");
      // setSuccess(false);
    } catch (err) {
      console.log(err);
      // setSuccess(false);
    }
  };
  const handleAmountSubmit = async () => {
    try {
      const { data } = await axios.post("/api/website/amount", {
        slugamount: "slugamount",
        amount,
      });
      toast.success("Saved");
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

  const handleFullImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      // setUploadButtonText(reader.name);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFullwithImage(reader.result);
          setFullImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setFullUploadButtonText("Upload Full Image");
      setFullImagePreview("Upload Full Image");
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

  const handleMissionContent = (e) => {
    setMissionContent(e);
  };

  const handleVisionContent = (e) => {
    setVisionContent(e);
  };

  const handleMainContent = (e) => {
    setMainContent(e);
  };
  const handleHeroContent = (e) => {
    setContent(e);
  };
  const handlePolicyContent = (e) => {
    setPolicyContent(e);
  };

  return (
    <Layout title="Manage Settings">
      <AdminLayout>
        <div className="container-fluid m-2">
          <div className="row my-3">
            <div className="col-md-3">
              <h1 className="lead">Manage Settings</h1>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <Tabs
                defaultActiveKey="1"
                // onChange={onChange}
                style={{ width: "180%", marginRight: 50 }}
              >
                <TabPane tab="CUSTOMIZE HERO SECTION" key="1">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <Card
                          cover={
                            <Avatar
                              shape="square"
                              style={{ height: "150px" }}
                              src={fullwithImage}
                              alt={title}
                            />
                          }
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="btn btn-dark btn-block text-left my-3 text-center"
                                  style={{
                                    width:
                                      fullImagePreview && fullImagePreview
                                        ? "150%"
                                        : "150%",
                                  }}
                                >
                                  {fullUploadButtonText}
                                  <input
                                    type="file"
                                    name="image"
                                    size="large"
                                    onChange={handleFullImage}
                                    accept="image/*"
                                    hidden
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="col-md-2 offset-2">
                              <div className="form-group">
                                {fullImagePreview ? (
                                  <Avatar size={60} src={fullImagePreview} />
                                ) : (
                                  <Avatar size={60} src="/images/preview.ico" />
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                      <div className="col-md-4">
                        <Card
                          cover={
                            <Avatar
                              shape="square"
                              style={{ height: "150px" }}
                              src={image}
                              alt={title}
                            />
                          }
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="btn btn-dark btn-block text-left my-3 text-center"
                                  style={{
                                    width:
                                      imagePreview && imagePreview
                                        ? "100%"
                                        : "100%",
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
                        </Card>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <Input
                          style={{ margin: "20px 0px 10px 0px" }}
                          size="large"
                          placeholder="Enter title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-md-8">
                        <Input
                          style={{ margin: "10px 0px 10px 0px" }}
                          size="large"
                          placeholder="Enter slogan"
                          value={slogan}
                          onChange={(e) => setSlogan(e.target.value)}
                        />
                      </div>
                      <div className="col-md-8">
                        <Editor
                          apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                          init={{
                            height: 200,
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
                          onEditorChange={handleHeroContent}
                          name="content"
                          value={content}
                        />
                      </div>
                      <div className="col-md-8">
                        <Button
                          onClick={handleHeroSubmit}
                          type="primary"
                          style={{ margin: "10px 0px 10px 0px" }}
                          loading={success}
                          block
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab=" CUSTOMIZE ABOUT US" key="2">
                  <Row style={{ marginRight: 50 }}>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter mission title"
                        value={missionTitle}
                        onChange={(e) => setMissionTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={9}>
                      <Input
                        style={{ margin: "20px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter vision title"
                        value={visionTitle}
                        onChange={(e) => setVisionTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Editor
                        apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                        init={{
                          height: 200,
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
                        onEditorChange={handleMissionContent}
                        name="missionContent"
                        value={missionContent}
                      />
                    </Col>
                    <Col span={9}>
                      <Editor
                        apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                        init={{
                          height: 200,
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
                        onEditorChange={handleVisionContent}
                        name="visionContent"
                        value={visionContent}
                      />
                    </Col>
                    <Col span={18} style={{ marginTop: 10 }}>
                      <Editor
                        apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                        init={{
                          height: 300,
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
                        onEditorChange={handleMainContent}
                        name="mainContent"
                        value={mainContent}
                      />
                    </Col>
                    <Col span={18}>
                      <Button
                        onClick={handleAboutSubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        // loading={ok}
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="CUSTOMIZE CALL TO ACTION" key="3">
                  <Row>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter main title"
                        value={mainTitle}
                        onChange={(e) => setMainTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter buttom text"
                        value={callSlogan}
                        onChange={(e) => setCallSlogan(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 5px 0px" }}
                        size="large"
                        placeholder="Enter title one"
                        value={titleOne}
                        onChange={(e) => setTitleOne(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 5px 0px" }}
                        size="large"
                        placeholder="Enter title two"
                        value={titleTow}
                        onChange={(e) => setTitleTow(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <TextArea
                        rows={4}
                        placeholder="Enter content One"
                        value={contentOne}
                        onChange={(e) => setContentOne(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <TextArea
                        rows={4}
                        placeholder="Enter content two"
                        value={contentTow}
                        onChange={(e) => setContentTow(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 5px 0px" }}
                        size="large"
                        placeholder="Enter title three"
                        value={titleThree}
                        onChange={(e) => setTitleThree(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "20px 0px 5px 0px" }}
                        size="large"
                        placeholder="Enter title four"
                        value={titleFour}
                        onChange={(e) => setTitleFour(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <TextArea
                        rows={4}
                        placeholder="Enter content three"
                        value={contentThree}
                        onChange={(e) => setContentThree(e.target.value)}
                      />
                    </Col>
                    <Col span={9} style={{ marginRight: 5 }}>
                      <TextArea
                        rows={4}
                        placeholder="Enter content four"
                        value={contentFour}
                        onChange={(e) => setContentFour(e.target.value)}
                      />
                    </Col>
                    <Col span={18}>
                      <Button
                        onClick={handleCallToActionSubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        // loading={ok}
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="TERMS SERVICES" key="4">
                  <Row>
                    <Col span={14} offset={2}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter policy title"
                        value={policyTitle}
                        onChange={(e) => setPolicyTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2}>
                      <Editor
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
                        onEditorChange={handlePolicyContent}
                        name="policyContent"
                        value={policyContent}
                      />
                    </Col>
                    <Col span={14} offset={2}>
                      <Button
                        onClick={handlePolicySubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        // loading={ok}
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="CUSTOMIZE FOOTER" key="5">
                  <Row>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter address title"
                        value={addressTitle}
                        onChange={(e) => setAddressTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter buttom text"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter quick links itle"
                        value={quickLinkTitle}
                        onChange={(e) => setQuickLinkTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter social title"
                        value={socialTitle}
                        onChange={(e) => setSocialTitle(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter facebook"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter facebook link"
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter twitter"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter twitter link"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter instagram title"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter  instagram link"
                        value={instagramLink}
                        onChange={(e) => setInstagramLink(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2}>
                      <Button
                        onClick={handleFooterSubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        // loading={ok}
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="SET AMOUNT" key="6">
                  <Row>
                    <Col span={14} offset={2} style={{ marginRight: 5 }}>
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Col>
                    <Col span={14} offset={2}>
                      <Button
                        onClick={handleAmountSubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}

export default ManageSettings;
