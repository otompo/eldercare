import { useState, useContext, useEffect } from "react";
import axios from "axios";

const usePolicy = () => {
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyContent, setPolicyContent] = useState("");

  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      const { data } = await axios.get("/api/website/policy/policy");
      setPolicyTitle(data.policyTitle);
      setPolicyContent(data.policyContent);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    policyTitle,
    policyContent,
    setPolicyTitle,
    setPolicyContent,
  };
};

export default usePolicy;
