import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import { AuthContext } from "../../context/authContext";
import AdminNav from "../nav/AdminNav";

const { Content } = Layout;

function AdminLayout({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) getCurrentAdmin();
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/current");
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  if (loading) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
