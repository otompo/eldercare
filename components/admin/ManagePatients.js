import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
// import LoadingToRedirect from "../LoadingToRedirect";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { Tooltip, Avatar, Modal, Select, Image, Switch, Spin } from "antd";
import { EyeOutlined, SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "@tinymce/tinymce-react";

function ManagePatients(props) {
  const { confirm } = Modal;
  const { Option } = Select;

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNum: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    county: "",
    niNumber: "",
    efullName: "",
    relationship: "",
    cellPhone: "",
    insuranceCarrier: "",
    insurancePlan: "",
    insuranceContact: "",
    policyNumber: "",
    groupNumber: "",
    niNumber: "",
    organization: "",
    primarycarephysician: "",
    bodyTemperature: "",
    bloodPressure: "",
    respirationRate: "",
    pulseRate: "",
    weight: "",
    oxygen: "",
    loading: false,
  });

  const router = useRouter();
  // context

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loadedDoctors, setLoadedDoctors] = useState([]);
  const [loadedSymptoms, setLoadedSymptoms] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loadedNurses, setLoadedNurses] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [nurse, setNurse] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [healthConcern, setHealthConcern] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [imagePreview, setImagePreview] = useState("");
  const [maritalstatus, setMaritalStatus] = useState([]);
  const [gender, setGender] = useState([]);
  const [dateofbirth, setDateofBirth] = useState(null);
  const [check, setCheck] = useState(Boolean);

  const onChange = (checked) => {
    setCheck(checked);
  };

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

  useEffect(() => {
    loadPatients();
    loadDoctors();
    loadNurse();
    loadSymptoms();
  }, [success]);

  const loadPatients = async () => {
    try {
      const { data } = await axios.get(`/api/admin/patients`);
      setPatients(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDoctors = async () => {
    try {
      const { data } = await axios.get(`/api/admin/doctors`);
      setLoadedDoctors(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadNurse = async () => {
    try {
      const { data } = await axios.get(`/api/admin/nurses`);
      setLoadedNurses(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({
        ...values,
        // firstName: "",
        // lastName: "",
        // email: "",
        // contactNum: "",
        // address: "",
        // city: "",
        // postCode: "",
        // efullName: "",
        // relationship: "",
        // cellPhone: "",
        // insuranceCarrier: "",
        // insurancePlan: "",
        // insuranceContact: "",
        // policyNumber: "",
        // groupNumber: "",
        // niNumber: "",
        // organization: "",
        // primarycarephysician: "",
        // bodyTemperature: "",
        // bloodPressure: "",
        // respirationRate: "",
        // pulseRate: "",
        // weight: "",
        // oxygen: "",
        loading: true,
      });
      setSuccess(true);

      const { data } = await axios.post(`/api/admin/patients`, {
        ...values,
        doctor,
        nurse,
        symptoms,
        image,
        check,
        dateofbirth,
        healthConcern,
        maritalstatus,
        gender,
      });

      // setValues({
      //   ...values,
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   contactNum: "",
      //   address: "",
      //   city: "",
      //   postCode: "",
      //   efullName: "",
      //   relationship: "",
      //   cellPhone: "",
      //   insuranceCarrier: "",
      //   insurancePlan: "",
      //   insuranceContact: "",
      //   policyNumber: "",
      //   groupNumber: "",
      //   niNumber: "",
      //   organization: "",
      //   primarycarephysician: "",
      //   loading: false,
      // });
      setImagePreview("/images/preview.ico");
      setDoctor([]);
      setDateofBirth(null);
      setIsModalVisible(false);
      toast.success("Success");
      setSuccess(false);
    } catch (err) {
      console.log(err.response.data.message);
      // toast.error(err.response.data.message);
      setValues({
        ...values,
        // firstName: "",
        // lastName: "",
        // email: "",
        // contactNum: "",
        // address: "",
        // city: "",
        // postCode: "",
        // efullName: "",
        // relationship: "",
        // cellPhone: "",
        // insuranceCarrier: "",
        // insurancePlan: "",
        // insuranceContact: "",
        // policyNumber: "",
        // groupNumber: "",
        // niNumber: "",
        // organization: "",
        // primarycarephysician: "",
        // bodyTemperature: "",
        // bloodPressure: "",
        // respirationRate: "",
        // pulseRate: "",
        // weight: "",
        // oxygen: "",
        loading: false,
      });
      setSuccess(false);
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

  const setData = () => {
    const data = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "First Name",
          field: "firstName",
          sort: "asc",
        },
        {
          label: "Last Name",
          field: "lastName",
          sort: "asc",
        },
        {
          label: "Contact",
          field: "contactNum",
          sort: "asc",
        },

        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },

        {
          label: "Joined Date",
          field: "joinedDate",
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

    patients &&
      patients.forEach((patient, index) => {
        data.rows.push({
          key: index,
          image: (
            <Avatar
              src={
                <Image
                  src={patient && patient.image && patient.image.url}
                  style={{ width: 32 }}
                  preview={false}
                />
              }
            />
          ),
          firstName: patient.firstName,
          lastName: patient.lastName,
          contactNum: `${patient.contactNum}`,
          email: patient.email,
          address: `${patient.address}`,
          joinedDate: `${moment(patient.createdAt).fromNow()}`,

          action: (
            <>
              <div className="row">
                <div className="col-md-8">
                  <Link href={`/admin/patients/${patient.username}`}>
                    <a>
                      <Tooltip
                        title={`View ${patient.firstName}`}
                        color="green"
                      >
                        <EyeOutlined
                          className="text-success d-flex justify-content-center "
                          style={{ cursor: "pointer", fontSize: 25 }}
                        />
                      </Tooltip>
                    </a>
                  </Link>
                </div>
                {/* <div className="col-md-6">
                  <Tooltip title={`Update ${patient.firstName}`} color="blue">
                    <span>
                      <RedoOutlined
                        className="text-primary d-flex justify-content-center "
                        style={{ cursor: "pointer", fontSize: 25 }}
                      />
                    </span>
                  </Tooltip>
                </div> */}
              </div>
            </>
          ),
        });
      });

    return data;
  };

  const handlehealthConcern = (e) => {
    setHealthConcern(e);
  };

  return (
    <Layout title="Manage Patients">
      <AdminLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Patients</h1>
            </div>

            <div className="col-md-6 offset-md-3">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                {" "}
                Add Patients
              </p>
            </div>
          </div>
        </div>
        <hr />

        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        {/* <pre>{JSON.stringify(doctors, null, 2)}</pre> */}
        <Modal
          title="+ Add Patients"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
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
                      value={values.firstName}
                      onChange={handleChange}
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
                      value={values.lastName}
                      onChange={handleChange}
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
                      value={values.email}
                      onChange={handleChange}
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
                      value={values.address}
                      onChange={handleChange}
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
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      name="postCode"
                      value={values.postCode}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter post code..."
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
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter country"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      name="county"
                      value={values.county}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter county"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      name="contactNum"
                      value={values.contactNum}
                      onChange={handleChange}
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
                      value={values.efullName}
                      onChange={handleChange}
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
                      value={values.relationship}
                      onChange={handleChange}
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
                      value={values.cellPhone}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter cell phone"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border p-2">
              <legend className="float-none w-auto p-2">NI Number</legend>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      name="niNumber"
                      value={values.niNumber}
                      onChange={handleChange}
                      className="form-control mb-4 p-2"
                      placeholder="Enter NI Number..."
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
                  {check ? (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="organization"
                          value={values.organization}
                          onChange={handleChange}
                          className="form-control my-4 p-2 "
                          placeholder="Enter  organization name"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="primarycarephysician"
                          value={values.primarycarephysician}
                          onChange={handleChange}
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
                  mode="multiple"
                  allowClear={true}
                  style={{
                    width: "100%",
                    padding: 1,
                    borderRadius: 5,
                  }}
                  onChange={(v) => setDoctor(v)}
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
                  mode="multiple"
                  allowClear={true}
                  style={{
                    width: "100%",
                    padding: 1,
                    borderRadius: 5,
                  }}
                  onChange={(v) => setNurse(v)}
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
              <button
                className="btn btn-primary btn-block"
                disabled={
                  !values.firstName || !values.lastName || !doctor || !image
                }
                type="submit"
              >
                {values.loading ? <SyncOutlined spin /> : "Submit"}
              </button>
            </div>
          </form>
        </Modal>
      </AdminLayout>
    </Layout>
  );
}

export default ManagePatients;
