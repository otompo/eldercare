import React, { useContext, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Tooltip, Avatar, Badge, Button } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import moment from "moment";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/authContext";

function ManageTrashStaff(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [staffs, setStaffs] = useState([]);
  const [total, setTotal] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllDoctorsInTrash();
  }, [success]);

  const getAllDoctorsInTrash = async () => {
    try {
      const { data } = await axios.get(`/api/admin/user/trash`);
      setStaffs(data.staff);
      setTotal(data.total);
    } catch (err) {
      console.log(err.response.data.message);
      // toast.error(err.response.data.message);
    }
  };

  const moveUserFromTrash = async (e, username) => {
    try {
      setSuccess(true);
      const { data } = await axios.patch(`/api/admin/user/trash/${username}`);
      setSuccess(false);
      toast.success("Success");
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message);
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
          label: "contact Number",
          field: "contactNum",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Joined Date",
          field: "join",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
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

    staffs &&
      staffs.forEach((staff, index) => {
        data.rows.push({
          key: index,
          name: `${staff && staff.name}`,
          contactNum: `${staff && staff.contactNum}`,
          email: `${staff && staff.email}`,
          join: `${moment(staff.createdAt).fromNow()}`,
          role: `${staff && staff.role}`,
          genearatedpassword: `${
            staff && staff.generatedPasword ? staff.generatedPasword : ""
          }`,
          action: (
            <>
              <div className="row">
                <div className="col-md-6">
                  <Tooltip title="Move user from trash">
                    <span
                      onClick={(e) =>
                        moveUserFromTrash(e, staff && staff.username)
                      }
                      // className="pt-1 pl-3"
                    >
                      <CoffeeOutlined
                        className="text-success d-flex justify-content-center "
                        style={{ cursor: "pointer", fontSize: 25 }}
                      />
                    </span>
                  </Tooltip>
                </div>
                <div className="col-md-6"></div>
              </div>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <Layout title="Manage Trash Staff">
      <AdminLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage staff in trash</h1>
            </div>
            <div className="col-md-3">
              <Link href={`/admin/staff`} className="bg-primary">
                <a>
                  <Button shape="round" success>
                    Total staff in trash:{" "}
                  </Button>
                  <Badge
                    count={total && total}
                    style={{ backgroundColor: "#E7267A" }}
                    className="pb-2 mr-2 my-2 m-1"
                    showZero
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <MDBDataTable
          data={setData()}
          className="px-3"
          bordered
          striped
          hover
        />
      </AdminLayout>
    </Layout>
  );
}

export default ManageTrashStaff;
