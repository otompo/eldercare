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
  // context
  // const { state, dispatch } = useContext(AuthContext);
  // const { user } = state;
  // const [ok, setOk] = useState(false);

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  // const getCurrentAdmin = async () => {
  //   try {
  //     const { data } = await axios.get("/api/admin/current");
  //     if (data.ok) setOk(true);
  //   } catch (err) {
  //     console.log(err);
  //     router.push("/");
  //     setOk(false);
  //   }
  // };

  // if (!user || !ok) {
  //   return <LoadingToRedirect />;
  // }

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
