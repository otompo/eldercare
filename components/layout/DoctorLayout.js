import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import DoctorsNav from "../nav/DoctorsNav";

const { Content } = Layout;

function DoctorLayout({ children }) {
  const router = useRouter();
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  // state
  const [ok, setOk] = useState(false);
  // hooks
  useEffect(() => {
    if (user?.token) getCurrentDoctor();
  }, [user?.token]);

  const getCurrentDoctor = async () => {
    try {
      const { data } = await axios.get("/api/doctors/current");
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      router.push("/");
      setOk(false);
    }
  };

  if (!user || !ok) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout>
      <DoctorsNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default DoctorLayout;
