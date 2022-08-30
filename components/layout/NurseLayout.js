import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import NursesNav from "../nav/NursesNav";

const { Content } = Layout;

function NurseLayout({ children }) {
  const router = useRouter();
  // context
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  // state
  const [ok, setOk] = useState(false);
  // hooks
  useEffect(() => {
    if (user?.token) getCurrentNurse();
  }, [user?.token]);

  const getCurrentNurse = async () => {
    try {
      const { data } = await axios.get("/api/nurses/current");
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
      <NursesNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default NurseLayout;
