import { useState, useContext, useEffect } from "react";
import axios from "axios";

const useFooter = () => {
  const [addressTitle, setAddressTitle] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [quickLinkTitle, setQuickLinkTitle] = useState("");
  const [socialTitle, setSocialTitle] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  useEffect(() => {
    loadFooter();
  }, []);

  const loadFooter = async () => {
    try {
      const { data } = await axios.get("/api/website/footer/footer");
      setAddressTitle(data.addressTitle);
      setLocation(data.location);
      setEmail(data.email);
      setContactNum(data.contactNum);
      setQuickLinkTitle(data.quickLinkTitle);
      setSocialTitle(data.socialTitle);
      setFacebook(data.facebook);
      setTwitter(data.twitter);
      setInstagram(data.instagram);
      setFacebookLink(data.facebookLink);
      setTwitterLink(data.twitterLink);
      setInstagramLink(data.instagramLink);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addressTitle,
    location,
    email,
    contactNum,
    quickLinkTitle,
    socialTitle,
    facebook,
    twitter,
    instagram,
    facebookLink,
    twitterLink,
    instagramLink,
    setAddressTitle,
    setLocation,
    setEmail,
    setContactNum,
    setQuickLinkTitle,
    setSocialTitle,
    setFacebook,
    setTwitter,
    setInstagram,
    setFacebookLink,
    setTwitterLink,
    setInstagramLink,
  };
};

export default useFooter;
