import {
  Avatar,
  Card,
  Col,
  Image,
  Input,
  List,
  Row,
  Modal,
  Button,
} from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DoctorLayout from "../layout/DoctorLayout";
import Layout from "../layout/Layout";
import renderHTML from "react-render-html";
import { Editor } from "@tinymce/tinymce-react";

function ManageComments(props) {
  const [selectedComment, setSelectedComment] = useState({});
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respirationRate, setRespirationRate] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [oxygen, setOxygen] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const { data } = await axios.get(`/api/doctors`);
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/comments/update/${selectedComment._id}`,
        {
          content,
          bodyTemperature,
          bloodPressure,
          respirationRate,
          pulseRate,
          weight,
          oxygen,
        }
      );

      let arr = comments;
      const index = arr.findIndex((c) => c._id === selectedComment._id);
      arr[index].content = data.content;
      setComments(arr);
      // ****************************************************
      let arrbodyTemperature = bodyTemperature;
      const indexbodyTemperature = arr.findIndex(
        (c) => c._id === selectedComment._id
      );
      arr[indexbodyTemperature].bodyTemperature = data.bodyTemperature;
      setBodyTemperature(arrbodyTemperature);
      // ****************************************************
      let arrbloodPressure = bloodPressure;
      const indexbloodPressure = arr.findIndex(
        (c) => c._id === selectedComment._id
      );
      arr[indexbloodPressure].bloodPressure = data.bloodPressure;
      setBloodPressure(arrbloodPressure);
      // ****************************************************
      let arrrespirationRate = respirationRate;
      const indexrespirationRate = arr.findIndex(
        (c) => c._id === selectedComment._id
      );
      arr[indexrespirationRate].respirationRate = data.respirationRate;
      setRespirationRate(arrrespirationRate);

      // ****************************************************
      let arrpulseRate = pulseRate;
      const indexpulseRate = arr.findIndex(
        (c) => c._id === selectedComment._id
      );
      arr[indexpulseRate].pulseRate = data.pulseRate;
      setPulseRate(arrpulseRate);

      // ****************************************************
      let arrweight = weight;
      const indexweight = arr.findIndex((c) => c._id === selectedComment._id);
      arr[indexweight].weight = data.weight;
      setWeight(arrweight);

      // ****************************************************
      let arroxygen = oxygen;
      const indexoxygen = arr.findIndex((c) => c._id === selectedComment._id);
      arr[indexoxygen].oxygen = data.oxygen;
      setOxygen(arroxygen);
      setVisible(false);
      setLoading(false);
      setSelectedComment({});
      toast.success("Comment Updated");
    } catch (err) {
      console.log(err);
      setVisible(false);
    }
  };

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

  const handleContent = (e) => {
    setContent(e);
  };

  return (
    <Layout title="Manage Comments">
      <DoctorLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Comments</h1>
            </div>
          </div>
        </div>

        <hr />
        {/* <pre>{JSON.stringify(bodyTemperature, null, 4)}</pre> */}
        <Row>
          <Col span={22} offset={1}>
            <Input
              placeholder="Search"
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <Card style={{ marginTop: 40 }}>
              <List
                itemLayout="horizontal"
                dataSource={filteredComments}
                pagination={{
                  pageSize: 10,
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
                          <h6 style={{ color: "##0E0045" }}>R-RATE</h6>
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
                      <Link
                        href={`/doctor/patients/${item?.patientId?.username}`}
                      >
                        <a>view</a>
                      </Link>,
                      <a
                        onClick={() => {
                          setSelectedComment(item);
                          setVisible(true);
                          setContent(item.content);
                          setBodyTemperature(item.bodyTemperature);
                          setBloodPressure(item.bloodPressure);
                          setRespirationRate(item.respirationRate);
                          setPulseRate(item.pulseRate);
                          setWeight(item.weight);
                          setOxygen(item.oxygen);
                        }}
                      >
                        edit
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        // <Avatar>{item?.patientId?.firstName?.charAt(0)}</Avatar>
                        <Avatar
                          src={
                            <Image
                              src={item?.patientId?.image?.url}
                              style={{ width: 32 }}
                              preview={false}
                            />
                          }
                        />
                      }
                      title={item?.patientId?.firstName}
                      description={renderHTML(item.content)}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Modal
              visible={visible}
              title="Update comment"
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={700}
              footer={null}
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
                name="content"
                value={content}
              />
              <Button
                onClick={handleSubmit}
                type="primary"
                style={{ margin: "10px 0px 10px 0px" }}
                loading={loading}
                block
              >
                SUBMIT
              </Button>
            </Modal>
          </Col>
        </Row>
      </DoctorLayout>
    </Layout>
  );
}

export default ManageComments;
