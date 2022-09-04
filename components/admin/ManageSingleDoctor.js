import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
// import LoadingToRedirect from "../LoadingToRedirect";
import moment from "moment";
import { Modal, Avatar, Image, List, Card, Tooltip, Select } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import ReactToPrint from "react-to-print";
import renderHTML from "react-render-html";

function ManageSingleDoctor(props) {
  const { confirm } = Modal;
  const { Option } = Select;

  const router = useRouter();

  const { username } = router.query;
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [patients, setPatients] = useState([]);
  const [comments, setComments] = useState([]);
  const [bio, setBio] = useState("");
  //   const [location, setLocation] = useState("");
  //   const [image, setImage] = useState("");
  //   const [actionTriggered, setActionTriggered] = useState("");
  //   const [imagePreview, setImagePreview] = useState("");

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

  // hooks
  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  useEffect(() => {
    loadDoctor();
  }, [username]);

  const loadDoctor = async () => {
    try {
      const { data } = await axios.get(`/api/doctors/${username}`);
      setName(data.doctor.name);
      setContactNum(data.doctor.contactNum);
      setEmail(data.doctor.email);
      setBio(data.doctor.bio);
      setCreatedAt(data.doctor.createdAt);
      setPatients(data.patients);
      setComments(data.comments);
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

  return (
    <Layout title={name}>
      <AdminLayout>
        <div className="container-fluid m-2">
          <div className="row my-4">
            <div className="col-md-6">
              <span className="d-inline">
                {" "}
                {/* <Avatar
                  size={64}
                  src={<Image src={image && image.url} preview={false} />}
                /> */}
              </span>{" "}
              <h4 className="d-inline uppercase">{name}</h4>
            </div>

            <div className="col-md-3 offset-md-3">
              <Tooltip
                title={`Print ${name} Bio and Inputs`}
                // color="green"
              >
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    showPrintData();
                  }}
                >
                  <PrinterOutlined style={{ fontSize: 25 }} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h6 className="d-inline">
                    FUll Name: <span className="lead"> {name} </span>{" "}
                  </h6>{" "}
                  <h6>
                    Contact:
                    <span className="lead"> {contactNum} </span>
                  </h6>{" "}
                  <h6>
                    Email:
                    <span className="lead"> {email} </span>
                  </h6>{" "}
                  <h6>
                    Assigned Patients:
                    <ul>
                      <span className="lead">
                        {patients &&
                          patients.map((patient, i) => (
                            <li key={i}>
                              <Link
                                href={`/admin/patients/${patient.username}`}
                              >
                                <a>
                                  <h6 className="hover:text-blue-700 d-inline">
                                    Full Name:
                                    <span className="lead">
                                      {" "}
                                      {patient.firstName} {patient.lastName}
                                    </span>
                                  </h6>{" "}
                                  <h6 className="d-inline">
                                    Contact:
                                    <span className="lead">
                                      {" "}
                                      {patient.primaryContactNum}{" "}
                                    </span>
                                  </h6>{" "}
                                  <h6 className="d-inline">
                                    Email:
                                    <span className="lead">
                                      {" "}
                                      {patient.email}{" "}
                                    </span>
                                  </h6>{" "}
                                </a>
                              </Link>
                            </li>
                          ))}
                      </span>
                    </ul>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="underline text-uppercase">BIO:</h4>
              <Card>{bio && bio ? renderHTML(bio) : ""}</Card>
            </div>
          </div>
        </div>
        <Modal
          title={`Print ${name} Bio and Inputs`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={900}
        >
          <div className="invoice__preview bg-white  rounded">
            <div ref={componentRef} className="py-5" id="invoice__preview">
              <div className="container">
                <div className="row">
                  <h2 className="text-uppercase d-inline py-4 px-3">
                    {/* <Avatar
                      style={{ backgroundColor: "green" }}
                      size={84}
                      src={<Image src="/images/logo.png" preview={false} />}
                    />{" "} */}
                    Elder Care
                  </h2>
                  <div className="col-md-12">
                    <ul>
                      <li>
                        {/* <p className="d-inline px-3">
                           <Avatar
                              size={64}
                              src={
                                <Image
                                  src={image && image.url}
                                  preview={false}
                                />
                              }
                            /> 
                        </p> */}
                        <h2 className="text-uppercase d-inline ">{name}</h2>
                      </li>
                      <li>
                        <h6 className="d-inline">Email:</h6> {email}
                      </li>
                      <li>
                        <h6 className="d-inline">Contact:</h6> {contactNum}
                      </li>

                      <li>
                        <h6 className="d-inline">Joined Date:</h6>{" "}
                        {moment(createdAt).format("ll")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <h6 className="px-3">BIO</h6>
              <Card>{bio && bio ? renderHTML(bio) : ""}</Card>
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
        </Modal>
        {/* <pre>{JSON.stringify(bio, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageSingleDoctor;
