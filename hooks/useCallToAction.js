import { useState, useContext, useEffect } from "react";
import axios from "axios";

const useCallToAction = () => {
  // state
  const [mainTitle, setMainTitle] = useState("");
  const [callSlogan, setCallSlogan] = useState("");
  const [titleOne, setTitleOne] = useState("");
  const [contentOne, setContentOne] = useState("");
  const [titleTow, setTitleTow] = useState("");
  const [contentTow, setContentTow] = useState("");
  const [titleThree, setTitleThree] = useState("");
  const [contentThree, setContentThree] = useState("");
  const [titleFour, setTitleFour] = useState("");
  const [contentFour, setContentFour] = useState("");

  useEffect(() => {
    loadCallToAction();
  }, []);

  const loadCallToAction = async () => {
    try {
      const { data } = await axios.get(
        "/api/website/calltoaction/calltoaction"
      );
      setMainTitle(data.mainTitle);
      setCallSlogan(data.callSlogan);
      setTitleOne(data.titleOne);
      setContentOne(data.contentOne);
      setTitleTow(data.titleTow);
      setContentTow(data.contentTow);
      setTitleThree(data.titleThree);
      setContentThree(data.contentThree);
      setTitleFour(data.titleFour);
      setContentFour(data.contentFour);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    mainTitle,
    callSlogan,
    titleOne,
    contentOne,
    titleTow,
    contentTow,
    titleThree,
    contentThree,
    titleFour,
    contentFour,
    setMainTitle,
    setCallSlogan,
    setTitleOne,
    setContentOne,
    setTitleTow,
    setContentTow,
    setTitleThree,
    setContentThree,
    setTitleFour,
    setContentFour,
  };
};

export default useCallToAction;
