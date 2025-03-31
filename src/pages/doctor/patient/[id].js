import Head from "next/head";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import DetailsPatient from "../../../components/DetailsPatient";
import withAuth from "../../../utils/withAuth";

function Patient() {
  return (
    <>
      <Head>
        <title>Detalhes do Paciente</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <DetailsPatient />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Patient)
