import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Card, Col, Row, Spin } from "antd";
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
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user && user.role && user.role.includes("admin")) {
  //     router.push("/admin");
  //   } else if (user && user.role && user.role.includes("doctor")) {
  //     router.push("/doctor");
  //   } else if (user && user.role && user.role.includes("nurse")) {
  //     router.push("/nurse");
  //   }
  // }, [user]);

  useEffect(() => {
    if (auth?.token) {
      router.push("/admin");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Success");
        // redirect user
        if (data && data.user && data.user.role.includes("admin")) {
          router.push("/admin");
          // toast.success("success");
        } else {
          router.push("/");
        }
        // form.resetFields();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  if (auth?.token) {
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
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <div className="d-grid gap-2">
                <button
                  disabled={!email || !password || loading}
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  {loading ? <Spin /> : "Login"}
                </button>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Signin;
