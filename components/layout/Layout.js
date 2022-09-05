import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

const Layout = ({ children, title = "ElderCare" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Legacy Grace Home Healthcare is a high standard home healthcare service that is located in Ghana, 
          west Africa providing home health services to Pastors and their wives and the general public at large"
        />
        <meta property="og:title" content="Elder Care" />
        <meta
          property="og:description"
          content="Legacy-Grace home health services will provide in home health care to our clients. Our services 
          will include, health education, private health screenings and checkups, medication management, 
          psychological/spiritual support and caregiver/aide care. We have a medical call center that will be available
           24hours 7days a week to answer all health care questions and provide guidance during health emergencies"
        />
        <meta property="og:site_name" content="Legacy Grace Home Healthcare" />
        <meta
          property="og:image"
          content="https://legacygracehealthcare.com/images/default.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://legacygracehealthcare.com/img/default.png"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
          integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc"
          crossOrigin="anonymous"
        ></script>
      </Head>

      {children}
    </div>
  );
};
export default Layout;
