import React, { useState, useEffect } from "react";
import axios from "axios";
import NurseLayout from "../layout/NurseLayout";
import Layout from "../layout/Layout";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Image } from "antd";
import Link from "next/link";

function ManagePatients(props) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const { data } = await axios.get(`/api/nurses`);
      setPatients(data.patients);
    } catch (err) {
      console.log(err);
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
                  <Link href={`/nurse/patients/${patient.username}`}>
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
              </div>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <Layout title="Assigned Patients">
      <NurseLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Assigned Patients</h1>
            </div>
          </div>
        </div>
        <hr />
        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        {/* <pre>{JSON.stringify(patients, null, 4)}</pre> */}
      </NurseLayout>
    </Layout>
  );
}

export default ManagePatients;
