import { useState, useContext, useEffect } from "react";
import axios from "axios";

const useHero = () => {
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [content, setContent] = useState("");
  const [fullwithImage, setFullwithImage] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const { data } = await axios.get("/api/website/hero/hero");
      setTitle(data.title);
      setSlogan(data.slogan);
      setContent(data.content);
      setFullwithImage(data.fullwithImage.url);
      setImage(data.image.url);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    title,
    slogan,
    content,
    fullwithImage,
    image,
    setTitle,
    setSlogan,
    setContent,
    setFullwithImage,
    setImage,
  };
};

export default useHero;
