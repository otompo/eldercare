import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Card, Col, Row } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Layout from "../layout/Layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/authContext";
import LoadingToRedirect from "../LoadingToRedirect";

function Signin(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role && user.role.includes("admin")) {
      router.push("/admin");
    } else if (user && user.role && user.role.includes("doctor")) {
      router.push("/doctor");
    } else if (user && user.role && user.role.includes("nurse")) {
      router.push("/nurse");
    }
  }, [user]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save user and token to context
        // save user and token to local storage
        dispatch({
          type: "LOGIN",
          payload: data,
        });
        // save in local storage
        Cookies.set("user", data);
        // console.log(data);
        // redirect user
        if (data && data.user && data.user.role.includes("admin")) {
          router.push("/admin");
          toast.success("success");
        } else {
          dispatch({ type: "LOGOUT" });
          Cookies.remove("user");
          router.push("/");
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  if (user) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout title="Signin">
      <Row>
        <Col
          xl={{ span: 8, offset: 8 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginBottom: 220, paddingTop: "100px" }}
        >
          {/* <h1 style={{ paddingTop: "100px" }}>Signin</h1> */}
          <Card>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
                email: "sasco@gmail.com",
                password: "otompo123@",
              }}
              onFinish={onFinish}
            >
              {/* email */}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please email is require!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              {/* password */}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                  block
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Signin;
