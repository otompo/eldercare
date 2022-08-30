import Link from "next/link";
import { CreateAccount, LogIn, DonateButton } from "./buttons";
import {
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  PhoneFilled,
  SendOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import useFooter from "../hooks/useFooter";

export default function Footer() {
  const {
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
  } = useFooter();

  return (
    <div className="bg-neutral-900 py-10 lg:py-20 relative" id="footer">
      <div className="slant-footer"></div>
      <footer className="px-10 max-width grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <ul className="">
          <h2 className="text-white text-3xl text-green-600">{addressTitle}</h2>

          <li className="my-4">
            <SendOutlined
              size={40}
              style={{ fontSize: 25, color: "#fff" }}
              className="text-white hover:text-green-700 hover:text-2sm"
            />
            <span className="text-white mx-2 mb-5 text-1xl">{location}</span>
          </li>
          <li className="my-4">
            <MailOutlined size={40} style={{ fontSize: 25, color: "#fff" }} />
            <span className="text-white mx-2 mb-5 text-1xl">
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          </li>
          <li className="my-4">
            <PhoneFilled
              size={40}
              style={{ fontSize: 25, color: "#fff" }}
              rotate={110}
            />
            <a href={`tel:${contactNum}`} style={{ color: "#000" }}>
              <span className="text-white mx-2 mb-5 text-1xl">
                +{contactNum}
              </span>
            </a>
          </li>
        </ul>

        <div>
          <h2 className="text-white text-3xl text-green-600">
            {quickLinkTitle}
          </h2>
          <ul className="">
            <li className="my-3">
              <Link href="/" className="text-white">
                <a>Home</a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/about" className="text-white">
                <a>About</a>
              </Link>
            </li>

            <li className="my-3">
              <Link href="/contact" className="text-white">
                <a>Contact</a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/termsofservices" className="text-white">
                <a>Terms of Services</a>
              </Link>
            </li>
          </ul>
        </div>

        <ul className="">
          <li className="">
            <CreateAccount />
          </li>
          {/* 
          <li className="my-5">
            <DonateButton />
          </li> */}
        </ul>
        <ul className="">
          <div>
            <h6 className="text-white text-3xl text-green-600">
              {socialTitle}
            </h6>
          </div>
          <li className="my-2">
            <Link href={facebookLink}>
              <a target="_blank">
                <FacebookFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {facebook}
                </span>
              </a>
            </Link>
          </li>
          <li className="my-2">
            <Link href={twitterLink}>
              <a target="_blank">
                <TwitterCircleFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {twitter}
                </span>
              </a>
            </Link>
          </li>
          <li className="my-2">
            <Link href={instagramLink}>
              <a target="_blank">
                <InstagramFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {instagram}
                </span>
              </a>
            </Link>
          </li>
        </ul>

        <p></p>

        <p></p>
      </footer>
      <div className="text-slate-200 text-center ml-5">
        Legacy Grace Home Healthcare © {new Date().getFullYear()} <br />
        <p className="text-center">
          Powered by{" "}
          <a
            style={{ fontSize: 15 }}
            href="https://codesmartwebsoft.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Code Smart Websoft
          </a>
        </p>
      </div>
    </div>
  );
}
