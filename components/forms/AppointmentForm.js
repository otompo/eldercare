import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Col, Row, Input, Button } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useAmount from "../../hooks/useAmount";

function AppointmentForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const { amount, setAmount } = useAmount();

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  //  paystack integration
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    firstName: firstName && firstName,
    lastName: lastName && lastName,
    bookingDate: startDate && startDate,
    amount: amount * 100,
    currency: "GHS",
    publicKey: process.env.PAYSTACK_API_KEY,
    metadata: {
      custom_fields: [
        {
          // room: room && room.name,
          bookingDate: startDate,
        },
      ],
    },
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    placeBookingsHandler(reference);
    toast.success("Payment made successfully");
    //console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error("Transaction Cancelled");
    router.push("/");
  };

  const placeBookingsHandler = async (params) => {
    try {
      const { data } = await axios.post(`/api/bookings`, {
        firstName,
        lastName,
        email,
        contactNum,
        whatsappNum,
        address,
        startDate,
        paymentInfo: {
          id: params.transaction,
          status: params.status,
          reference: params.reference,
        },
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNum("");
      setWhatsappNum("");
      setAddress("");
      setStartDate(null);
    } catch (err) {
      console.log(err);
    }
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="btn btn-block py-3 btn-primary my-3"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Book
        </button>
      </div>
    );
  };

  return (
    <Row>
      <Col xl={{ span: 20, offset: 2 }} xs={{ span: 24 }}>
        <Input
          size="large"
          value={firstName}
          placeholder="Enter first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={lastName}
          placeholder="Enter last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={email}
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={contactNum}
          placeholder="Enter contact number"
          onChange={(e) => {
            setContactNum(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={whatsappNum}
          placeholder="Enter whatsapp number"
          onChange={(e) => {
            setWhatsappNum(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={address}
          placeholder="Enter address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <br />
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            isClearable={true}
            timeIntervals={5}
            placeholderText="Select Appointment Date and Time"
            style={{ width: "100px", backgroundColor: "red" }}
          />
        </div>
      </Col>

      <Col xl={{ span: 20, offset: 2 }} xs={{ span: 24 }}>
        {/* <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type="primary"
          // onClick={handlePublish}
          block
          disabled={
            !firstName || !email || !lastName || !contactNum || !address
          }
        >
          Submit
        </Button> */}
        <PaystackHookExample />
      </Col>
    </Row>
  );
}

export default AppointmentForm;
