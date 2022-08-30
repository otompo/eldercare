import { useState } from "react";
import { Modal } from "antd";
import {
  PhoneFilled,
  SendOutlined,
  ScheduleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AppointmentForm from "./forms/AppointmentForm";
import renderHTML from "react-render-html";

export default function Home({
  title = "LEGACY GRACE HOME HEALTHCARE S",
  slogan = "Supporting Your Overall Health",
  fullwithImage = "./images/pages.jpeg",
  image = "./images/joy.png",
  content = "Legacy-Grace Home Health is a high standard home healthcare service that is located in Ghana, west Africa providing home health services to Pastors and their wives and the general public at large.",
  email = "tophealthtv@gmail.com",
  contactNum = "0245789561",
}) {
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
    <section id="hero">
      <img src={fullwithImage} alt="image" className="full-img" />
      <section className="content">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:place-items-center md:gap-10 lg:gap-20">
          <article className="pl-10">
            <h1 className="title text-white mb-3 text-4xl  md:w-2/3 lg:w-3/4  font-bold md:text-left uppercase">
              {title}
            </h1>

            <h6 className="text-blue-300 md:mt-0 mb-3  md:text-left font-bold capitalize sm:text-2xl  italic">
              {slogan}
            </h6>

            <ul className="flex flex-wrap items-center justify-center md:justify-start">
              <li className="sm:text-2xl text-white italic">
                {renderHTML(content)}
              </li>
            </ul>
          </article>
          <article className="w-full lg:max-w-full lg:flex">
            <div className="h-148 lg:h-auto w-6/12  md:w-6/12 flex-none bg-cover text-center overflow-hidden health">
              <img
                src={image}
                alt="Legacy Grace Home Healthcare"
                title="Legacy Grace Home Healthcare"
                className="small-img"
              />
            </div>
            <div className=" grid grid-cols-2 gap-0  max-width-card">
              <div className=" bg-blue-900  p-4 flex flex-col justify-between leading-normal card-top">
                <div onClick={showModal}>
                  <div className="font-bold text-xl mb-2 text-white text-center">
                    <ScheduleOutlined style={{ fontSize: 60 }} />
                  </div>
                  <h5 className="text-white text-base md:text-5lx text-bold sm:text-lg text-center">
                    APPOINTMENTS
                  </h5>
                </div>
              </div>
              <div className=" bg-blue-800  p-4 flex flex-col justify-between leading-normal card-top">
                <a href={`mailto:${email}`}>
                  <div className="font-bold text-xl mb-2 text-white text-center">
                    <MailOutlined style={{ fontSize: 60 }} />
                  </div>
                  <h5 className="text-white text-base md:text-5lx text-bold sm:text-lg text-center">
                    MAIL
                  </h5>
                </a>
              </div>
              <div className=" bg-blue-700  p-4 flex flex-col justify-between leading-normal card-down">
                <a href={`tel:${contactNum}`} style={{ color: "#000" }}>
                  <div className="font-bold text-xl mb-2 text-white text-center">
                    <PhoneFilled style={{ fontSize: 60 }} />
                  </div>
                  <h5 className="text-white text-base text-bold text-lg text-center">
                    CALL
                  </h5>
                </a>
              </div>

              <div className=" bg-blue-500  p-4 flex flex-col justify-between leading-normal card-down">
                <Link href="/contact" className="text-white">
                  <a>
                    <div className="font-bold text-xl mb-2 text-white text-center">
                      <SendOutlined style={{ fontSize: 60 }} />
                    </div>
                    <h5 className="text-white text-base text-bold text-lg text-center">
                      LOCATION
                    </h5>
                  </a>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
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
    </section>
  );
}
