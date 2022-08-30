import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import FormatCurrency from "../FormatCurrency";
import axios from "axios";

function ManageBookings(props) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const { data } = await axios.get(`/api/bookings`);
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "Full Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Contact Number",
          field: "contact",
          sort: "asc",
        },
        {
          label: "WhatsApp Number",
          field: "whatsappNum",
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
          label: "Booked Date",
          field: "bookedDate",
          sort: "asc",
        },

        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Reference  Number",
          field: "referenceNumber",
          sort: "asc",
        },
        // {
        //   label: "Action",
        //   field: "action",
        //   sort: "asc",
        // },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking, index) => {
        data.rows.push({
          key: index,
          name: `${booking.firstName} ${booking.lastName}`,
          contact: `${booking.contactNum}`,
          whatsappNum: `${booking.whatsappNum}`,
          email: booking.email,
          address: booking.address,
          bookedDate: `${moment(booking.bookingDate).format("ll")}`,
          amount: `${FormatCurrency(booking.amountPaid * 0.01)}`,
          referenceNumber: booking.reference,
        });
      });

    return data;
  };

  return (
    <Layout title="Manage Bookings">
      <AdminLayout>
        <div className="container m-2">
          <div className="row my-4">
            <div className="col-md-3">
              <h1 className="lead">Manage Bookings</h1>
            </div>
          </div>
        </div>
        <hr />
        <MDBDataTable data={setData()} sort="desc" bordered striped hover />
        {/* <pre>{JSON.stringify(bookings, null, 2)}</pre> */}
      </AdminLayout>
    </Layout>
  );
}

export default ManageBookings;
