import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConnectionContent from "../components/ConnectionContent";

export default function Conection() {
  return (
    <>
      <Head>
        <title>Conexão</title>
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
