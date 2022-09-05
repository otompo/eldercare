import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { AuthContext } from "../../context/authContext";
import { Tooltip, Modal, Spin } from "antd";
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
import axios from "axios";
import renderHTML from "react-render-html";

function ManageServices(props) {
  const { confirm } = Modal;
  const [values, setValues] = useState({
    title: "",
    loading: false,
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [content, setContent] = useState("");

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
    loadServices();
  }, [success]);

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/services`, {
        title: values.title,
        content,
      });
      setValues({ ...values, title: "", loading: false });
      setSuccess(false);
      setContent("");
      setIsModalVisible(false);
      toast.success("Success");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
      setSuccess(false);
    }
  };

  const loadServices = async () => {
    try {
      const { data } = await axios.get("/api/admin/services");
      setServices(data);
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

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete`,
        icon: <ExclamationCircleOutlined />,
        content: "It will be deleted permanentily if you click Yes",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          setValues({ ...values, loading: true });
          let allServices = services;
          const removed = allServices.splice(index, 1);
          setServices(allServices);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/services/delete/${removed[0]._id}`
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
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Content",
          field: "content",
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

    services &&
      services.forEach((service, index) => {
        data.rows.push({
          key: index,
          title: service && service.title,
          content: renderHTML(service.content),
          createdDate: `${moment(service.createdAt).format("ll")}`,
          action: (
            <>
              <div className="row">
                {/* <div className="col-md-6">
                  <Link href={`/admin/posts/${service.slug}`}>
                    <a>
                      <Tooltip title={`View ${service.name}`} color="green">
                        <EyeOutlined
                          className="text-success d-flex justify-content-center "
                          style={{ cursor: "pointer", fontSize: 25 }}
                        />
                      </Tooltip>
                    </a>
                  </Link>
                </div> */}
                <div className="col-md-12">
                  <Tooltip title={`Delete ${service.name}`}>
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
    <Layout title="Manage Services">
      <AdminLayout>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-3">
              <h1 className="lead">Manage Services</h1>
            </div>
            <div className="col-md-6 offset-md-1">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                Add Service
              </p>
            </div>
          </div>
        </div>
        <hr />

        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        <Modal
          title="+ ADD SERVICE"
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

            <div className="form-group">
              <Editor
                apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                // initialValue=""
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
                onEditorChange={handleContent}
                name="content"
                value={content}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-primary py-2"
              disabled={values.loading ? true : false}
            >
              {values.loading ? <Spin /> : "CREATE"}
            </button>
          </form>
        </Modal>
        {/* <pre>{JSON.stringify(services, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageServices;
