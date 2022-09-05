import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { MDBDataTable } from "mdbreact";
import { Tooltip, Button, Badge, Modal } from "antd";
import { useRouter } from "next/router";
import { DeleteOutlined, EyeOutlined, SyncOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import moment from "moment";
import axios from "axios";
import Link from "next/link";

function ManageNurses(props) {
  const { confirm } = Modal;

  const [values, setValues] = useState({
    name: "",
    email: "",
    contactNum: "",
    loading: false,
  });

  const router = useRouter();
  // context

  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [total, setTotal] = useState("");

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
    loadNurse();
    getAllNursesInTrash();
  }, [success]);

  const getAllNursesInTrash = async () => {
    try {
      const { data } = await axios.get(`/api/nurses/trash`);
      setTotal(data.total);
    } catch (err) {
      console.log(err.response.data.message);
      // toast.error(err.response.data.message);
    }
  };

  const loadNurse = async () => {
    try {
      const { data } = await axios.get(`/api/admin/nurses`);
      setDoctors(data);
    } catch (err) {
      console.log(err);
    }
  };

  const moveUserToTrash = async (e, username) => {
    try {
      setSuccess(true);
      const { data } = await axios.put(`/api/admin/user/trash/${username}`);
      setSuccess(false);
      toast.success("Success");
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({
        ...values,
        name: "",
        email: "",
        contactNum: "",
        loading: true,
      });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/user`, {
        ...values,
        role: "nurse",
      });
      toast.success("Success");
      setIsModalVisible(false);
      setValues({
        ...values,
        name: "",
        email: "",
        contactNum: "",
        loading: false,
      });
      setSuccess(false);
    } catch (err) {
      console.log(err.response);
      // toast.error(err.response.data.message);
      setSuccess(false);
    }
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
          label: "Contact",
          field: "contact",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },

        {
          label: "Joined Date",
          field: "joinedDate",
          sort: "asc",
        },

        {
          label: "Generated Password",
          field: "genearatedpassword",
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

    doctors &&
      doctors.forEach((doctor, index) => {
        data.rows.push({
          key: index,
          name: doctor.name,
          contact: `${doctor.contactNum}`,
          email: doctor.email,
          joinedDate: `${moment(doctor.createdAt).fromNow()}`,
          genearatedpassword: `${
            doctor && doctor.generatedPasword ? doctor.generatedPasword : ""
          }`,
          action: (
            <>
              <div className="row">
                <div className="col-md-6">
                  <Link href={`/admin/nurses/${doctor.username}`}>
                    <a>
                      <Tooltip title={`View ${doctor.name}`} color="green">
                        <EyeOutlined
                          className="text-success d-flex justify-content-center "
                          style={{ cursor: "pointer", fontSize: 25 }}
                        />
                      </Tooltip>
                    </a>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Tooltip title={`Trash ${doctor.name}`}>
                    <span
                      onClick={(e) =>
                        moveUserToTrash(e, doctor && doctor.username)
                      }
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
    <Layout title="Manage Nurses">
      <AdminLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Nurses</h1>
            </div>
            <div className="col-md-3">
              <Tooltip title="View Users in Trash">
                <Link href={`/admin/nurses/trash`}>
                  <a>
                    <Button shape="round" success>
                      Total nurses in trash:{" "}
                    </Button>
                    <Badge
                      count={total && total}
                      style={{ backgroundColor: "#E7267A" }}
                      className="pb-2 mr-2 my-2 m-1"
                      showZero
                    />
                  </a>
                </Link>
              </Tooltip>
            </div>
            <div className="col-md-6">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                {" "}
                Add Nurse
              </p>
            </div>

            <Modal
              title="+ Add Nurse"
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

                <div className="form-group">
                  <input
                    type="text"
                    name="contactNum"
                    value={values.contactNum}
                    onChange={handleChange}
                    className="form-control mb-4 p-2"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                {/* <fieldset disabled>
                  <div className="form-group">
                    <label htmlFor="disabledSelect">Role</label>
                    <select
                      id="disabledSelect"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {["doctor"].map((role) => (
                        <option key={role} value={role} className="py-5 ">
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset> */}
                <div className="d-grid gap-2 my-2 ">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={!values.name || !values.email}
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

        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        {/* <pre>{JSON.stringify(doctors, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageNurses;
