import { useState, createContext } from "react";

const TestimonialsContext = createContext();

const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState({
    testimonials: [],
  });

  return (
    <TestimonialsContext.Provider value={[testimonials, setTestimonials]}>
      {children}
    </TestimonialsContext.Provider>
  );
};

export { TestimonialsContext, TestimonialsProvider };
