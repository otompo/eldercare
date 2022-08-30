import { useState, createContext } from "react";

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState({
    services: [],
  });

  return (
    <ServiceContext.Provider value={[services, setServices]}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };
