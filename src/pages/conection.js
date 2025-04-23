import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConnectionContent from "../components/ConnectionContent";
import withAuth from "../utils/withAuth";

function Conection() {
  
  return (
    <>
      <Head>
        <title>Medir com goniômetro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <ConnectionContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Conection);
