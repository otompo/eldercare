import React, { useState, useEffect, useContext } from "react";
import { Menu, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
  TransactionOutlined,
  DashboardFilled,
  UserOutlined,
  LogoutOutlined,
  NodeIndexOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const { SubMenu } = Menu;
const { Sider } = Layout;

const NursesNav = () => {
  const router = useRouter();
  // context
  const { state, dispatch } = useContext(AuthContext);

  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        mode="inline"
        inlineCollapsed={collapsed}
        style={{ height: "90vh" }}
      >
        <Menu.Item key="3" icon={<DashboardFilled />}>
          <Link href="/nurse">
            <a className={activeName("/nurse")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* comments */}
        <Menu.Item key="4" icon={<NodeIndexOutlined />}>
          <Link href="/nurse/patients">
            <a className={activeName("/nurse/patients")}>
              My Assigned Patients
            </a>
          </Link>
        </Menu.Item>

        <Menu.Item key="5" icon={<CommentOutlined />}>
          <Link href="/nurse/comments">
            <a className={activeName("/nurse/comments")}>Comments</a>
          </Link>
        </Menu.Item>

        {/* profile */}
        <Menu.Item key="13" icon={<UserOutlined />}>
          <Link href={`/nurse/profile`}>
            <a className={activeName(`/nurse/profile`)}>Profile</a>
          </Link>
        </Menu.Item>

        <Menu.Item
          style={{ marginBottom: 50 }}
          key="15"
          icon={<LogoutOutlined style={{ color: "red" }} />}
        >
          <p
            onClick={handleLogout}
            className="mt-2"
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default NursesNav;
