import { useState } from "react";
import { Modal } from "antd";

import AppointmentForm from "../forms/AppointmentForm";

export default function CreateAccount() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="bg-blue-500 py-2 px-6 rounded text-base hover:bg-transparent border-2 border-blue-500 text-white transition-all duration-500 hover:opacity-75 hover:bg-blue-800 hover:border-blue-800 shadow-lg"
      >
        BOOK APPOINTMENT
      </button>
      <Modal
        title="BOOK APPOINTMENT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <AppointmentForm />
      </Modal>
    </>
  );
}
