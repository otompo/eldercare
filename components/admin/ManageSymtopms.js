import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { Tooltip, Modal } from "antd";
import { MDBDataTable } from "mdbreact";
import {
  DeleteOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const { confirm } = Modal;

function ManageSymtopms(props) {
  const [values, setValues] = useState({
    name: "",
    loading: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [symptoms, setSymptoms] = useState([]);

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
    loadSymptoms();
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setValues({
        ...values,
        name: "",
        loading: true,
      });
      const { data } = await axios.post(`/api/admin/symptoms`, {
        ...values,
        role: "admin",
      });
      toast.success("Success");
      setIsModalVisible(false);
      setValues({
        ...values,
        name: "",
        loading: false,
      });
      setSuccess(false);
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
      setValues({
        ...values,
        name: "",
        loading: false,
      });
      setIsModalVisible(false);
      setSuccess(false);
    }
  };

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
          let allSymptoms = symptoms;
          const removed = allSymptoms.splice(index, 1);
          setSymptoms(allSymptoms);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/symptoms/delete/${removed[0]._id}`
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

  const loadSymptoms = async () => {
    try {
      const { data } = await axios.get(`/api/admin/symptoms`);
      setSymptoms(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
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

    symptoms &&
      symptoms.forEach((symptom, index) => {
        data.rows.push({
          key: index,
          name: <h6>{symptom.name}</h6>,
          action: (
            <>
              <div className="row">
                <div className="col-md-6">
                  <Tooltip title={`Trash ${symptom.name}`}>
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

  return (
    <Layout title="Signs & Symptoms">
      <AdminLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-6">
              <h1 className="lead">Manage Signs & Symptoms</h1>
            </div>

            <div className="col-md-6">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                {" "}
                Add Signs & Symptoms
              </p>
            </div>

            <Modal
              title="+ Add Signs & Symptoms"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="d-grid gap-2 my-2 ">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={!values.name}
                    type="submit"
                  >
                    {values.loading ? <SyncOutlined spin /> : "Submit"}
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <hr />
        <div className="container mb-4">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <MDBDataTable
                data={setData()}
                sort="desc"
                bordered
                striped
                hover
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}

export default ManageSymtopms;
