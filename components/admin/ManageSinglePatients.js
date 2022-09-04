import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import LoadingToRedirect from "../LoadingToRedirect";
import moment from "moment";
import {
  Modal,
  Avatar,
  Image,
  List,
  Card,
  Tooltip,
  Select,
  Tabs,
  Switch,
  Spin,
} from "antd";
import { PrinterOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import ReactToPrint from "react-to-print";
import renderHTML from "react-render-html";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const { TabPane } = Tabs;
function ManageSinglePatients(props) {
  const { confirm } = Modal;
  const { Option } = Select;

  const router = useRouter();

  const { username } = router.query;
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  // const [ok, setOk] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [patient, setPatient] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [efullName, setEFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [organization, setOrganization] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [primarycarephysician, setPrimaryCarePhysician] = useState("");

  var preData = moment(predateofbirth).format("MMM Do Y");

  const [dateofbirth, setDateofBirth] = useState(Date(preData).toDateString);

  const [predateofbirth, setPreDateofBirth] = useState("");

  const [comments, setComments] = useState([]);
  const [actionTriggered, setActionTriggered] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [doctors, setDoctors] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [preDoctors, setPreDoctors] = useState([]);
  const [preSymptoms, setPreSymptoms] = useState([]);
  const [preNurses, setPreNurses] = useState([]);
  const [gender, setGender] = useState("");
  const [preGender, setPreGender] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("Married");
  const [preMaritalStatus, setPreMaritalStatus] = useState("");
  const [loadedDoctors, setLoadedDoctors] = useState([]);
  const [loadedSymptoms, setLoadedSymptoms] = useState([]);
  const [loadedNurses, setLoadedNurses] = useState([]);
  const [check, setCheck] = useState(Boolean);
  const [preCheck, setPreCheck] = useState(Boolean);
  const [insuranceCarrier, setInsuranceCarrier] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [insuranceContact, setInsuranceContact] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
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

  const showPrintData = () => {
    return showModal();
  };

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    loadDoctors();
    loadNurses();
    loadPatient();
    loadSymptoms();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      // setOk(true);
      const { data } = await axios.put(
        `/api/admin/patients/update/${username}`,
        {
          firstName,
          lastName,
          email,
          image: imagePreview,
          doctor: doctors,
          nurse: nurses,
          symptoms: symptoms,
          contactNum,
          region,
          address,
          homeTown,
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
          gender: gender,
          dateofbirth: dateofbirth,
          maritalstatus: maritalstatus,
          check: check,
          healthConcern: healthConcern,
          bodyTemperature,
          bloodPressure,
          respirationRate,
          pulseRate,
          weight,
          oxygen,
        }
      );

      toast.success("Success");
      setIsModalVisible(false);
      setSuccess(false);
      router.push(`/admin/patients`);
      // setOk(false);
    } catch (err) {
      console.log(err.response.data.message);
      setSuccess(false);
      // setOk(false);
    }
  };

  const loadPatient = async () => {
    try {
      const { data } = await axios.get(`/api/patient/${username}`);
      setPatient(data.patient);
      setComments(data.comments);
      setFirstName(data.patient.firstName);
      setEFullName(data.patient.efullName);
      setPreDateofBirth(data.patient.dateofbirth);
      setLastName(data.patient.lastName);
      setRelationship(data.patient.relationship);
      setPrimaryCarePhysician(data.patient.primarycarephysician);
      setOrganization(data.patient.organization);
      setCheck(data.patient.check);
      setPreCheck(data.patient.check);
      setCellPhone(data.patient.cellPhone);
      setEmail(data.patient.email);
      setHomeTown(data.patient.homeTown);
      setMaritalStatus(data.patient.maritalstatus);
      setPreMaritalStatus(data.patient.maritalstatus);
      setImage(data.patient.image.url);
      setImagePreview(data.patient.image.url);
      setCreatedAt(data.patient.createdAt);
      setPreDoctors(data.patient.doctor);
      setPreSymptoms(data.patient.symptoms);
      setPreNurses(data.patient.nurse);
      setGender(data.patient.gender);
      setPreGender(data.patient.gender);
      setContactNum(data.patient.contactNum);
      setRegion(data.patient.region);
      setAddress(data.patient.address);
      setInsuranceCarrier(data.patient.insuranceCarrier);
      setInsurancePlan(data.patient.insurancePlan);
      setInsuranceContact(data.patient.insuranceContact);
      setPolicyNumber(data.patient.policyNumber);
      setGroupNumber(data.patient.groupNumber);
      setSocialSecurityNumber(data.patient.socialSecurityNumber);
      setHealthConcern(data.patient.healthConcern);
      setBodyTemperature(data.patient.bodyTemperature);
      setBloodPressure(data.patient.bloodPressure);
      setRespirationRate(data.patient.respirationRate);
      setPulseRate(data.patient.pulseRate);
      setWeight(data.patient.weight);
      setOxygen(data.patient.oxygen);
      let doctorarr = [];
      data.patient.doctor.map((d) => doctorarr.push(d._id));
      setDoctors(doctorarr);
      let nursearr = [];
      data.patient.nurse.map((n) => nursearr.push(n._id));
      setNurses(nursearr);
      let symptomsearr = [];
      data.patient.symptoms.map((s) => symptomsearr.push(s._id));
      setSymptoms(symptomsearr);
      setSuccess(false);
    } catch (err) {
      console.log(err);
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

  const loadDoctors = async () => {
    try {
      const { data } = await axios.get(`/api/admin/nurses`);
      setLoadedNurses(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadNurses = async () => {
    try {
      const { data } = await axios.get(`/api/admin/doctors`);
      setLoadedDoctors(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSymptoms = async () => {
    try {
      const { data } = await axios.get(`/api/admin/symptoms`);
      setLoadedSymptoms(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlehealthConcern = (e) => {
    setHealthConcern(e);
  };

  const onChange = (checked) => {
    setPreCheck(checked);
    setCheck(checked);
  };

  return (
    <Layout title={firstName}>
      <AdminLayout>
        <div className="container-fluid m-2">
          <div className="row mt-5">
            <div className="col-md-6">
              <span className="d-inline">
                {" "}
                <Avatar size={64} src={<Image src={image} preview={false} />} />
              </span>{" "}
              <h4 className="d-inline uppercase">
                {firstName} {lastName}
              </h4>
            </div>
            <div className="col-md-3">
              <Tooltip
                title={`Update ${firstName} ${lastName} Info`}
                color="blue"
              >
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    showPrintData();
                    setActionTriggered("ACTION_2");
                  }}
                >
                  UPDATE
                </button>
              </Tooltip>
            </div>
            <div className="col-md-3">
              <Tooltip
                title={`Print ${firstName} ${lastName} Health History`}
                // color="green"
              >
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    showPrintData();
                    setActionTriggered("ACTION_1");
                  }}
                >
                  <PrinterOutlined style={{ fontSize: 25 }} />
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
                          {moment(predateofbirth).format("ll")}{" "}
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
                          {preMaritalStatus &&
                            preMaritalStatus.map((status, i) => (
                              <li key={i}>
                                <h6 className="d-inline">
                                  Marital Status:
                                  <span className="lead"> {status}</span>
                                </h6>
                              </li>
                            ))}{" "}
                          {preGender &&
                            preGender.map((sex, i) => (
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

                    {insuranceCarrier ? (
                      <TabPane
                        tab="Insurance Information"
                        key="3"
                        className="uppercase"
                      >
                        <h6>
                          Insurance Carrier:
                          <span className="lead"> {insuranceCarrier} </span>
                        </h6>{" "}
                        <h6>
                          Insurance Plan:
                          <span className="lead"> {insurancePlan} </span>
                        </h6>{" "}
                        <h6>
                          Insurance Contact:
                          <span className="lead"> {insuranceContact} </span>
                        </h6>{" "}
                        <h6>
                          Policy Number:
                          <span className="lead"> {policyNumber} </span>
                        </h6>{" "}
                        <h6>
                          Group Number:
                          <span className="lead"> {groupNumber} </span>
                        </h6>{" "}
                        <h6>
                          Social Security Number:
                          <span className="lead"> {socialSecurityNumber} </span>
                        </h6>{" "}
                      </TabPane>
                    ) : null}

                    {preCheck ? (
                      <TabPane
                        tab="Referrals And Adjunctive Care"
                        key="4"
                        className="uppercase"
                      >
                        <h6>
                          For: <span className="lead"> {organization} </span>{" "}
                        </h6>{" "}
                        <h6>
                          Primary Care Physician:{" "}
                          <span className="lead"> {primarycarephysician} </span>{" "}
                        </h6>{" "}
                      </TabPane>
                    ) : null}

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
                                <Link
                                  href={`/admin/doctors/${doctor.username}`}
                                >
                                  <a>
                                    <h6 className="hover:text-blue-700 d-inline">
                                      Name:
                                      <span className="lead">
                                        {" "}
                                        {doctor.name}{" "}
                                      </span>
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
                                      <span className="lead">
                                        {" "}
                                        {doctor.email}{" "}
                                      </span>
                                    </h6>{" "}
                                  </a>
                                </Link>
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
                                <Link href={`/admin/nurses/${doctor.username}`}>
                                  <a>
                                    <h6 className="hover:text-blue-700 d-inline">
                                      Name:
                                      <span className="lead">
                                        {" "}
                                        {doctor.name}{" "}
                                      </span>
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
                                      <span className="lead">
                                        {" "}
                                        {doctor.email}{" "}
                                      </span>
                                    </h6>{" "}
                                  </a>
                                </Link>
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
                  dataSource={comments}
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
          title={
            actionTriggered == "ACTION_1" ? (
              <span>{`Print ${firstName} ${lastName} Health History`}</span>
            ) : (
              <span>{`Update ${firstName} ${lastName} Info`}</span>
            )
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={actionTriggered == "ACTION_1" ? 900 : 800}
        >
          {actionTriggered == "ACTION_1" ? (
            <div className="invoice__preview bg-white  rounded">
              <div ref={componentRef} className="p-4" id="invoice__preview">
                <div className="container-fliud">
                  <div className="row">
                    <div className="col">
                      <h2 className="text-uppercase d-inline py-4 px-3">
                        {/* <Avatar
                          style={{ backgroundColor: "green" }}
                          size={84}
                          src={<Image src="/images/logo.png" preview={false} />}
                        />{" "} */}
                        Elder Care
                      </h2>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <p className="d-inline px-3">
                        <Avatar
                          size={64}
                          src={<Image src={image} preview={false} />}
                        />
                      </p>
                      <h2 className="text-uppercase d-inline">
                        {firstName} {lastName}
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <hr />
                      <ul>
                        <h6>
                          Email:
                          <span className="lead"> {email} </span>
                        </h6>
                        <h6>
                          Date of Birth:
                          <span className="lead">
                            {" "}
                            {moment(predateofbirth).format("ll")}{" "}
                          </span>
                        </h6>
                        <h6>
                          Contact:
                          <span className="lead"> {contactNum} </span>
                        </h6>{" "}
                        <span className="lead">
                          {" "}
                          {/* {maritalstatus &&
                            maritalstatus.map((status, i) => (
                              <li key={i}>
                                <h6 className="d-inline">
                                  Marital Status:
                                  <span className="lead"> {status}</span>
                                </h6>
                              </li>
                            ))}{" "} */}
                          {preGender &&
                            preGender.map((sex, i) => (
                              <li key={i}>
                                <h6 className="d-inline">
                                  Gender
                                  <span className="lead"> {sex}</span>
                                </h6>
                              </li>
                            ))}{" "}
                        </span>
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
                        <li>
                          <h6 className="d-inline">Joined Date:</h6>{" "}
                          {moment(createdAt).format("ll")}
                        </li>
                      </ul>
                    </div>

                    <div className="col">
                      <hr />
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
                    </div>

                    <div className="col">
                      {insuranceCarrier ? (
                        <>
                          <hr />
                          <h6>
                            Insurance Carrier:
                            <span className="lead"> {insuranceCarrier} </span>
                          </h6>{" "}
                          <h6>
                            Insurance Plan:
                            <span className="lead"> {insurancePlan} </span>
                          </h6>{" "}
                          <h6>
                            Insurance Contact:
                            <span className="lead"> {insuranceContact} </span>
                          </h6>{" "}
                          <h6>
                            Policy Number:
                            <span className="lead"> {policyNumber} </span>
                          </h6>{" "}
                          <h6>
                            Group Number:
                            <span className="lead"> {groupNumber} </span>
                          </h6>{" "}
                          <h6>
                            Social Security Number:
                            <span className="lead">
                              {" "}
                              {socialSecurityNumber}{" "}
                            </span>
                          </h6>{" "}
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {check ? (
                        <>
                          <hr />
                          <h6>
                            For: <span className="lead"> {organization} </span>{" "}
                          </h6>{" "}
                          <h6>
                            Primary Care Physician:{" "}
                            <span className="lead">
                              {" "}
                              {primarycarephysician}{" "}
                            </span>{" "}
                          </h6>{" "}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <hr />
                      <h5>Assigned Doctors</h5>
                      <ul>
                        <span className="lead">
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <hr />
                      <h5>Assigned Nurses</h5>
                      <ul>
                        <span className="lead">
                          {preNurses &&
                            preNurses.map((doctor, i) => (
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
                    </div>
                  </div>

                  <div className="container-fluid">
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
                                <span className="text-info">Temperature:</span>{" "}
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
                                <span className="text-info">Pulse Rate:</span>{" "}
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
                </div>
                <hr />
                <h6 className="px-3">Comments</h6>
                <Card style={{ marginTop: 15, marginBottom: 15 }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={comments}
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
              <div className="container">
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-primary float-right">
                          Print / Download
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">
                  Patients Information
                </legend>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter  first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter  last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <DatePicker
                        selected={dateofbirth}
                        onChange={(date) => setDateofBirth(date)}
                        // value={dateofbirth ? dateofbirth : preData}
                        dateFormat="MMMM d, yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Select Date of birth"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <select
                        id="gender"
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        {["Male", "Female", "Others"].map((gender) => (
                          <option key={gender} value={gender} className="py-5 ">
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <select
                        id="maritalstatus"
                        className="form-control"
                        value={maritalstatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                      >
                        {[
                          "Married",
                          "Single",
                          "Divorced",
                          "Widow",
                          "Widower",
                        ].map((maritalstatus) => (
                          <option
                            key={maritalstatus}
                            value={maritalstatus}
                            className="py-5 "
                          >
                            {maritalstatus}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter region"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="homeTown"
                        value={homeTown}
                        onChange={(e) => setHomeTown(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter home town"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="contactNum"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">
                  Emergency Contact
                </legend>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="efullName"
                        value={efullName}
                        onChange={(e) => setEFullName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="relationship"
                        value={relationship}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter relationship"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="cellPhone"
                        value={cellPhone}
                        onChange={(e) => setCellPhone(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter cell phone"
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">
                  Insurance Information
                </legend>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="insuranceCarrier"
                        value={insuranceCarrier}
                        onChange={(e) => setInsuranceCarrier(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter  insurance carrier"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="insurancePlan"
                        value={insurancePlan}
                        onChange={(e) => setInsurancePlan(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter insurance plan"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="insuranceContact"
                        value={insuranceContact}
                        onChange={(e) => setInsuranceContact(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter  policy number"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="groupNumber"
                        value={groupNumber}
                        onChange={(e) => setGroupNumber(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter group number"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="text"
                        name="socialSecurityNumber"
                        value={socialSecurityNumber}
                        onChange={(e) =>
                          setSocialSecurityNumber(e.target.value)
                        }
                        className="form-control mb-4 p-2"
                        placeholder="Enter social security number"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">
                  Referrals And Adjunctive Care
                </legend>
                <div className="row">
                  <div className="col">
                    <p className="d-inline">
                      Are you currently under medical care ?
                    </p>

                    <div className="form-check d-inline  px-5">
                      <Switch onChange={onChange} />
                    </div>
                    {preCheck ? (
                      <>
                        <div className="form-group">
                          <input
                            type="text"
                            name="organization"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="form-control my-4 p-2 "
                            placeholder="Enter  organization name"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            name="primarycarephysician"
                            value={primarycarephysician}
                            onChange={(e) =>
                              setPrimaryCarePhysician(e.target.value)
                            }
                            className="form-control mb-4 p-2"
                            placeholder="Enter  primary care physician"
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2 mb-3">
                <legend className="float-none w-auto p-2">Vital Signs</legend>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="bodyTemperature">Temperature</label>
                      <input
                        id="bodyTemperature"
                        type="text"
                        name="bodyTemperature"
                        value={bodyTemperature}
                        onChange={(e) => setBodyTemperature(e.target.value)}
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
                        value={bloodPressure}
                        onChange={(e) => setBloodPressure(e.target.value)}
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
                        value={respirationRate}
                        onChange={(e) => setRespirationRate(e.target.value)}
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
                        value={oxygen}
                        onChange={(e) => setOxygen(e.target.value)}
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
                        value={pulseRate}
                        onChange={(e) => setPulseRate(e.target.value)}
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
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter weight"
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">
                  Health Concern/Signs & Symptoms
                </legend>
                <div className="row">
                  <div className="col">
                    <p>Select Signs & Symptoms</p>
                    <div className="form-group">
                      <Select
                        mode="multiple"
                        allowClear={true}
                        style={{
                          width: "100%",
                          padding: 1,
                          borderRadius: 5,
                        }}
                        onChange={(v) => setSymptoms(v)}
                        value={[...symptoms]}
                        placeholder="Select Signs & Symptoms"
                      >
                        {loadedSymptoms.map((item) => (
                          <Option key={item._id}>{item.name}</Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col">
                    
                    </div> */}
                  <div className="col">
                    <p>
                      Describe your main conserns (symptoms, onset, diagnoses,
                      duration, etc.)
                    </p>
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
                      onEditorChange={handlehealthConcern}
                      name="healthConcern"
                      value={healthConcern}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">Select Doctor</legend>

                <div className="form-group mt-4">
                  <Select
                    id="doctors"
                    mode="multiple"
                    allowClear={true}
                    style={{
                      width: "100%",
                      padding: 1,
                      borderRadius: 5,
                    }}
                    onChange={(v) => setDoctors(v)}
                    value={[...doctors]}
                    placeholder="Select Doctor"
                  >
                    {loadedDoctors.map((item) => (
                      <Option key={item._id}>{item.name}</Option>
                    ))}
                  </Select>
                </div>
              </fieldset>

              <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">Select Nurse</legend>

                <div className="form-group mt-4">
                  <Select
                    id="nurse"
                    mode="multiple"
                    allowClear={true}
                    style={{
                      width: "100%",
                      padding: 1,
                      borderRadius: 5,
                    }}
                    onChange={(v) => setNurses(v)}
                    value={[...nurses]}
                    placeholder="Select Nurse"
                  >
                    {loadedNurses.map((item) => (
                      <Option key={item._id}>{item.name}</Option>
                    ))}
                  </Select>
                </div>
              </fieldset>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className="btn btn-dark btn-block text-left my-3 text-center"
                      style={{
                        width: imagePreview && imagePreview ? "50vh" : "100%",
                      }}
                    >
                      {loading ? (
                        <span className="spinLoader">
                          <Spin />
                        </span>
                      ) : (
                        `${uploadButtonText}`
                      )}

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

              <div className="d-grid gap-2 my-2 ">
                <button className="btn btn-primary btn-block" type="submit">
                  {success ? <SyncOutlined spin /> : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Modal>
        {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageSinglePatients;
