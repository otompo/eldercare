import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import renderHTML from "react-render-html";
import Zoom from "react-reveal/Zoom";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data } = await axios.get("/api/admin/testimonials");
      setTestimonials(data);
    } catch (err) {
      console.log(err);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Fragment>
      <div className="bg-gray-300 relative">
        <section className="px-12">
          <article>
            <h2 className="text-slate-800 font-bold text-3xl md:text-4xl text-center uppercase">
              Testimonials
            </h2>
          </article>

          <Carousel
            responsive={responsive}
            autoPlay={false}
            shouldResetAutoplay={false}
            ssr={true}
            infinite={true}
          >
            {testimonials &&
              testimonials.map((testimonial, i) => (
                <div
                  className=" max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 md:mx-5"
                  key={i}
                  style={{ height: "60%" }}
                >
                  <Zoom>
                    <div className="flex justify-center md:justify-end -mt-16">
                      <img
                        className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                        src={
                          testimonial &&
                          testimonial.image &&
                          testimonial.image.url
                        }
                      />
                    </div>
                    <div
                      className="flex justify-end mt-2"
                      // style={{ height: 120 }}
                    >
                      <p className="text-xl font-medium text-green-800">
                        {testimonial.name}
                      </p>
                    </div>
                    <div>
                      <p className="mt-2 text-gray-600">
                        {renderHTML(testimonial.message)}
                      </p>
                    </div>
                  </Zoom>
                </div>
              ))}
          </Carousel>
        </section>
      </div>
      {/* <pre>{JSON.stringify(testimonials, null, 2)}</pre> */}
      <div className="slant-left"></div>
    </Fragment>
  );
};

export default Testimonials;
