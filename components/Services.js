import React, { Fragment, useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import axios from "axios";
import renderHTML from "react-render-html";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await axios.get("/api/admin/services");
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className=" bg-gray-300 lg:py-20 relative lg:py-32">
        <div className="slant-service"></div>
        <section className="services">
          <article>
            <h2 className="text-slate-800 font-bold text-3xl md:text-4xl  text-center uppercase">
              Services
            </h2>
          </article>

          <div className="flex flex-wrap w-full lg:max-w-full lg:flex">
            {services &&
              services.map((service, i) => (
                <Zoom>
                  <div
                    className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3"
                    key={i}
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="mb-4 text-xl text-center">
                          {service.title}
                        </h3>
                        <div className="mb-4 text-grey-darker text-sm flex-1">
                          <p>{renderHTML(service.content)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              ))}
          </div>
        </section>
      </div>
      <div className="slant-left-service"></div>
    </Fragment>
  );
}
