import React, { useState, useEffect, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AdminNav = () => {
  const router = useRouter();
  // context
  const [auth, setAuth] = useContext(AuthContext);

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

  const handleLogout = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
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
        // defaultOpenKeys={["2", "6", "7", "9", "11", "14"]}
        defaultOpenKeys={["16"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/admin">
            <a className={activeName("/admin")}>Dashboard</a>
          </Link>
        </Menu.Item>

        <SubMenu key="2" icon={<PushpinOutlined />} title="Doctors">
          <Menu.Item key="3">
            <Link href="/admin/doctors">
              <a className={activeName("/admin/doctors")}>Manage Doctors</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="4" icon={<PushpinOutlined />} title="Nurses">
          <Menu.Item key="5">
            <Link href="/admin/nurses">
              <a className={activeName("/admin/nurses")}>Manage Nurses</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="6" icon={<PushpinOutlined />} title="Signs & Symptoms">
          <Menu.Item key="7">
            <Link href="/admin/symptoms">
              <a className={activeName("/admin/symptoms")}>
                Manage Signs & Symptoms
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* library */}
        <SubMenu key="8" icon={<CameraOutlined />} title="Patients">
          <Menu.Item key="9">
            <Link href="/admin/patients">
              <a className={activeName("/admin/patients")}>Manage Patients</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* users */}
        <SubMenu key="12" icon={<UserSwitchOutlined />} title="Staff">
          <Menu.Item key="13">
            <Link href="/admin/staff">
              <a className={activeName("/admin/staff")}>Manage Staff</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key="15" icon={<UserOutlined />}>
          <Link href={`/admin/profile`}>
            <a className={activeName(`/admin/profile`)}>Profile</a>
          </Link>
        </Menu.Item>

        <Menu.Item
          style={{ marginBottom: 150 }}
          key="20"
          icon={<LogoutOutlined style={{ color: "red" }} />}
        >
          <p
            onClick={handleLogout}
            className="mt-2 text-danger "
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
