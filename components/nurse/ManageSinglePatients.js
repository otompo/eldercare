import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Layout from "../layout/Layout";
import LoadingToRedirect from "../LoadingToRedirect";
import moment from "moment";
import { Avatar, Image, List, Card, Button, Tabs, Modal, Tooltip } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import NurseLayout from "../layout/NurseLayout";
import { Editor } from "@tinymce/tinymce-react";
import renderHTML from "react-render-html";

const { TabPane } = Tabs;
function ManageSinglePatients(props) {
  const { confirm } = Modal;
  const router = useRouter();

  const [values, setValues] = useState({
    bodyTemperature: "",
    bloodPressure: "",
    respirationRate: "",
    pulseRate: "",
    weight: "",
    oxygen: "",
    loading: false,
  });
  const { username } = router.query;
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSucces] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loadedComments, setLoadedComments] = useState([]);
  const [comment, setComment] = useState("");
  const [preDoctors, setPreDoctors] = useState([]);
  const [preNurses, setPreNurses] = useState([]);
  const [preSymptoms, setPreSymptoms] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [efullName, setEFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [dateofbirth, setDateofBirth] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalStatus] = useState([]);
  const [healthConcern, setHealthConcern] = useState("");
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respirationRate, setRespirationRate] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [oxygen, setOxygen] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // hooks
  useEffect(() => {
    if (user?.token) getCurrentAdmin();
  }, [user?.token]);

  useEffect(() => {
    loadPatient();
  }, [username, success]);

  const loadPatient = async () => {
    try {
      const { data } = await axios.get(`/api/patient/${username}`);
      setLoadedComments(data.comments);
      setPatientId(data.patient._id);
      setFirstName(data.patient.firstName);
      setLastName(data.patient.lastName);
      setEmail(data.patient.email);
      setImage(data.patient.image);
      setPreDoctors(data.patient.doctor);
      setPreNurses(data.patient.nurse);
      setPreSymptoms(data.patient.symptoms);
      setContactNum(data.patient.contactNum);
      setHealthConcern(data.patient.healthConcern);
      setRelationship(data.patient.relationship);
      setEFullName(data.patient.efullName);
      setDateofBirth(data.patient.dateofbirth);
      setCreatedAt(data.patient.createdAt);
      setCellPhone(data.patient.cellPhone);
      setHomeTown(data.patient.homeTown);
      setRegion(data.patient.region);
      setAddress(data.patient.address);
      setMaritalStatus(data.patient.maritalstatus);
      setGender(data.patient.gender);
      setBodyTemperature(data.patient.bodyTemperature);
      setBloodPressure(data.patient.bloodPressure);
      setRespirationRate(data.patient.respirationRate);
      setPulseRate(data.patient.pulseRate);
      setWeight(data.patient.weight);
      setOxygen(data.patient.oxygen);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setSucces(true);
      const { data } = await axios.post(`/api/comments/create/${patientId}`, {
        comment,
        bodyTemperature: values.bodyTemperature,
        bloodPressure: values.bloodPressure,
        respirationRate: values.respirationRate,
        pulseRate: values.pulseRate,
        weight: values.weight,
        oxygen: values.oxygen,
      });
      setComment("");
      setIsModalVisible(false);
      toast.success("success");
      setSucces(false);
    } catch (err) {
      console.log(err);
      setSucces(false);
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

  if (loading) {
    return <LoadingToRedirect />;
  }

  const handleContent = (e) => {
    setComment(e);
  };

  return (
    <Layout>
      <NurseLayout>
        <div className="container-fluid m-2">
          <div className="row my-4">
            <div className="col-md-6">
              <span className="d-inline">
                {" "}
                <Avatar
                  size={64}
                  src={<Image src={image && image.url} preview={false} />}
                />
              </span>{" "}
              <h4 className="d-inline uppercase">
                {firstName} {lastName}
              </h4>
            </div>
            <div className="col-md-4 offset-md-2">
              <Tooltip
                title={`Add comments to ${firstName} Health History`}
                // color="green"
              >
                <button className="btn btn-success" onClick={showModal}>
                  Add Comment
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <hr />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      tab="Patients Information"
                      key="1"
                      className="uppercase"
                    >
                      <h6 className="d-inline">
                        First Name: <span className="lead"> {firstName} </span>{" "}
                      </h6>{" "}
                      <h6 className="d-inline">
                        Last Name: <span className="lead"> {lastName} </span>{" "}
                      </h6>{" "}
                      <br />
                      <h6>
                        Date of Birth:
                        <span className="lead">
                          {" "}
                          {moment(dateofbirth).format("ll")}{" "}
                        </span>
                      </h6>
                      <h6>
                        Contact:
                        <span className="lead"> {contactNum} </span>
                      </h6>{" "}
                      <h6>
                        Region:
                        <span className="lead"> {region} </span>
                      </h6>{" "}
                      <h6>
                        Home Town:
                        <span className="lead"> {homeTown} </span>
                      </h6>{" "}
                      <h6>
                        Address:
                        <span className="lead"> {address} </span>
                      </h6>{" "}
                      <h6>
                        Email:
                        <span className="lead"> {email} </span>
                      </h6>
                      <ul>
                        <span className="lead">
                          {" "}
                          {maritalstatus &&
                            maritalstatus.map((status, i) => (
                              <li key={i}>
                                <h6 className="d-inline">
                                  Marital Status:
                                  <span className="lead"> {status}</span>
                                </h6>
                              </li>
                            ))}{" "}
                          {gender &&
                            gender.map((sex, i) => (
                              <li key={i}>
                                <h6 className="d-inline">
                                  Gender
                                  <span className="lead"> {sex}</span>
                                </h6>
                              </li>
                            ))}{" "}
                        </span>
                      </ul>
                      <h6>
                        Joined Date:
                        <span className="lead">
                          {" "}
                          {moment(createdAt).format("ll")}{" "}
                        </span>
                      </h6>
                    </TabPane>

                    <TabPane
                      tab="Emergency Contact"
                      key="2"
                      className="uppercase"
                    >
                      <h6 className="d-inline">
                        Full Name: <span className="lead"> {efullName} </span>{" "}
                      </h6>{" "}
                      <h6>
                        Relationship:{" "}
                        <span className="lead"> {relationship} </span>{" "}
                      </h6>{" "}
                      <h6>
                        Contact:
                        <span className="lead"> {cellPhone} </span>
                      </h6>{" "}
                    </TabPane>

                    <TabPane
                      tab="Assigned Doctors"
                      key="5"
                      className="uppercase"
                    >
                      <ul>
                        <span className="lead">
                          {" "}
                          {preDoctors &&
                            preDoctors.map((doctor, i) => (
                              <li key={i}>
                                <Avatar
                                  size={35}
                                  style={{ backgroundColor: "green" }}
                                >
                                  {i + 1}
                                </Avatar>{" "}
                                <h6 className="d-inline">
                                  Name:
                                  <span className="lead"> {doctor.name} </span>
                                </h6>{" "}
                                <h6 className="d-inline">
                                  Contact:
                                  <span className="lead">
                                    {" "}
                                    {doctor.contactNum}{" "}
                                  </span>
                                </h6>{" "}
                                <h6 className="d-inline">
                                  Email:
                                  <span className="lead"> {doctor.email} </span>
                                </h6>{" "}
                              </li>
                            ))}{" "}
                        </span>
                      </ul>
                    </TabPane>

                    <TabPane
                      tab="Assigned Nurses"
                      key="6"
                      className="uppercase"
                    >
                      <ul>
                        <span className="lead">
                          {" "}
                          {preNurses &&
                            preNurses.map((doctor, i) => (
                              <li key={i}>
                                <Avatar
                                  size={35}
                                  style={{ backgroundColor: "green" }}
                                >
                                  {i + 1}
                                </Avatar>{" "}
                                <h6 className="hover:text-blue-700 d-inline">
                                  Name:
                                  <span className="lead"> {doctor.name} </span>
                                </h6>{" "}
                                <h6 className="d-inline">
                                  Contact:
                                  <span className="lead">
                                    {" "}
                                    {doctor.contactNum}{" "}
                                  </span>
                                </h6>{" "}
                                <h6 className="d-inline">
                                  Email:
                                  <span className="lead"> {doctor.email} </span>
                                </h6>{" "}
                              </li>
                            ))}{" "}
                        </span>
                      </ul>
                    </TabPane>

                    <TabPane
                      tab="Initial Health History"
                      key="7"
                      // className="uppercase"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <h6>SIGNS & SYMPTOMS:</h6>
                            <ul className="list-group">
                              {preSymptoms
                                ? preSymptoms.map((symptom, i) => (
                                    <li
                                      className="list-group-item text-dark"
                                      key={i}
                                    >
                                      {symptom.name}
                                    </li>
                                  ))
                                : ""}
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h6>VITAL SIGNS:</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <ul className="list-group">
                                  <li className="list-group-item">
                                    <span className="text-info">
                                      Temperature:
                                    </span>{" "}
                                    {bodyTemperature}
                                  </li>
                                  <li className="list-group-item">
                                    <span className="text-info">
                                      Blood Pressure:
                                    </span>{" "}
                                    {bloodPressure}
                                  </li>
                                  <li className="list-group-item">
                                    <span className="text-info">
                                      Respiration Rate:
                                    </span>{" "}
                                    {respirationRate}
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-6">
                                <ul>
                                  <li className="list-group-item">
                                    <span className="text-info">
                                      Pulse Rate:
                                    </span>{" "}
                                    {pulseRate}
                                  </li>

                                  <li className="list-group-item">
                                    <span className="text-info">Weight:</span>{" "}
                                    {weight}
                                  </li>
                                  <li className="list-group-item">
                                    <span className="text-info">Oxygen:</span>{" "}
                                    {oxygen}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <h6>NOTES:</h6>
                      <p>{renderHTML(healthConcern)}</p>
                    </TabPane>
                  </Tabs>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="underline text-uppercase pt-4">Health History:</h4>
              <Card style={{ marginTop: 15, marginBottom: 15 }}>
                <List
                  itemLayout="horizontal"
                  dataSource={loadedComments}
                  pagination={{
                    pageSize: 3,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      key={item._id}
                      id={item._id}
                      actions={[
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>T</h6>
                            <div>{item.bodyTemperature}</div>
                          </div>
                        </div>,
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>P</h6>
                            <div>{item.bloodPressure}</div>
                          </div>
                        </div>,
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>R-RATE</h6>
                            <div>{item.respirationRate}</div>
                          </div>
                        </div>,
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>P-RATE</h6>
                            <div>{item.pulseRate}</div>
                          </div>
                        </div>,
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>O2</h6>
                            <div>{item.oxygen}</div>
                          </div>
                        </div>,
                        <div className="row">
                          <div className="col">
                            <h6 style={{ color: "#0E0045" }}>W</h6>
                            <div>{item.weight}</div>
                          </div>
                        </div>,

                        <p className="text-success">
                          {moment(item.createdAt).format("LLLL")}
                        </p>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar>{item?.commentBy?.name?.charAt(0)}</Avatar>
                        }
                        title={item?.commentBy?.name}
                        description={renderHTML(item.content)}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </div>
        </div>
        <Modal
          title="Add Comment"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={700}
        >
          <fieldset className="border p-2 mb-3">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="bodyTemperature">Temperature</label>
                  <input
                    id="bodyTemperature"
                    type="text"
                    name="bodyTemperature"
                    value={values.bodyTemperature}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter  temperature "
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="bloodPressure">Pressure</label>
                  <input
                    id="bloodPressure"
                    type="text"
                    name="bloodPressure"
                    value={values.bloodPressure}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter  pressure"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="respirationRate">Respiration Rate</label>
                  <input
                    id="respirationRate"
                    type="text"
                    name="respirationRate"
                    value={values.respirationRate}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter respiration rate"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="oxygen">Oxygen</label>
                  <input
                    id="oxygen"
                    type="text"
                    name="oxygen"
                    value={values.oxygen}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter oxygen"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="pulseRate">Pulse Rate</label>
                  <input
                    id="pulseRate"
                    type="text"
                    name="pulseRate"
                    value={values.pulseRate}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter pulse rate"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <input
                    id="weight"
                    type="text"
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter weight"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <Editor
            apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
            // initialValue=""
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
            onEditorChange={handleContent}
            name="comment"
            value={comment}
          />
          <Button
            onClick={handleSubmit}
            type="primary"
            style={{ margin: "10px 0px 10px 0px" }}
            loading={success}
            disabled={comment === ""}
            block
          >
            POST
          </Button>
        </Modal>
      </NurseLayout>
    </Layout>
  );
}

export default ManageSinglePatients;
