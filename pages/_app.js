import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/authContext";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
