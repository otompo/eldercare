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

function ManageSingleNurse(props) {
  const { confirm } = Modal;
  const { Option } = Select;

  const router = useRouter();

  const { username } = router.query;
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [patients, setPatients] = useState([]);
  const [comments, setComments] = useState([]);
  const [bio, setBio] = useState("");
  const [nurse, setNurse] = useState("");
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

  useEffect(() => {
    loadNurse();
  }, [username]);

  const loadNurse = async () => {
    try {
      const { data } = await axios.get(`/api/nurses/${username}`);
      setNurse(data);
      setName(data.nurse.name);
      setContactNum(data.nurse.contactNum);
      setEmail(data.nurse.email);
      setBio(data.nurse.bio);
      setCreatedAt(data.nurse.createdAt);
      setPatients(data.patients);
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

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
                              <Avatar
                                size={35}
                                style={{ backgroundColor: "green" }}
                              >
                                {i + 1}
                              </Avatar>{" "}
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
          width={700}
        >
          <div className="invoice__preview bg-white  rounded">
            <div ref={componentRef} className="py-5" id="invoice__preview">
              <div className="container">
                <div className="row">
                  <h2 className="text-uppercase d-inline py-4 px-3">
                    Elder Care
                  </h2>
                  <div className="col-md-12">
                    <ul>
                      <li>
                        <p className="d-inline px-3">
                          {/* <Avatar
                              size={64}
                              src={
                                <Image
                                  src={image && image.url}
                                  preview={false}
                                />
                              }
                            /> */}
                        </p>
                        <h2 className="text-uppercase d-inline px-3">{name}</h2>
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
              <Card>
                <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={(item) => (
                    <List.Item
                      key={item._id}
                      id={item._id}
                      actions={[<p>{moment(item.createdAt).format("LLLL")}</p>]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar>
                            {item?.patientId?.firstName?.charAt(0)}
                          </Avatar>
                        }
                        title={item?.patientId?.firstName}
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
        {/* <pre>{JSON.stringify(nurse, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageSingleNurse;
