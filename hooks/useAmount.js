import { useState, useContext, useEffect } from "react";
import axios from "axios";

const useAmount = () => {
  // state
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadAmount();
  }, []);

  const loadAmount = async () => {
    try {
      const { data } = await axios.get("/api/website/amount/slugamount");
      setAmount(data.amount);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    amount,
    setAmount,
  };
};

export default useAmount;
