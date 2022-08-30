import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import { AuthContext } from "../context/authContext";
// import { Image } from "antd";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [current, setCurrent] = useState("");
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", changebackground);
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const changebackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  return (
    <div className={navbar ? "header herderactive  sticky" : "header sticky"}>
      <nav className="navbar ">
        <Fade right>
          <div>
            <Link href="/" className="logo">
              <a>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  className="pb-1 ant-menu-item"
                  width={100}
                  height={100}
                />
              </a>
            </Link>
          </div>
        </Fade>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#ffffff" }} />
          ) : (
            <FaBars size={30} style={{ color: "#ffffff" }} />
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className={router.pathname == "/" ? "active-nav" : "nav-item "}>
            <Link href="/" onClick={closeMenu}>
              <a>Home</a>
            </Link>
          </li>
          <li
            className={router.pathname == "/posts" ? "active-nav" : "nav-item "}
          >
            <Link href="/posts" onClick={closeMenu}>
              <a>Blog</a>
            </Link>
          </li>
          <li
            className={router.pathname == "/about" ? "active-nav" : "nav-item "}
          >
            <Link href="/about" onClick={closeMenu}>
              <a>About</a>
            </Link>
          </li>

          <li
            className={
              router.pathname == "/contact" ? "active-nav" : "nav-item "
            }
          >
            <Link href="/contact" onClick={closeMenu}>
              <a>Contact</a>
            </Link>
          </li>
          {user && user ? (
            <li
              className={
                router.pathname == "/user" ? "active-nav" : "nav-item "
              }
            >
              {user?.role && user.role.includes("admin") ? (
                <Link href="/admin" className="text-base text-slate-700">
                  <a>Dashboard</a>
                </Link>
              ) : user?.role && user.role.includes("doctor") ? (
                <Link href="/doctor" className="text-base text-slate-700">
                  <a>Dashboard</a>
                </Link>
              ) : (
                <Link href="/nurse" className="text-base text-slate-700">
                  <a>Dashboard</a>
                </Link>
              )}
            </li>
          ) : (
            " "
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
