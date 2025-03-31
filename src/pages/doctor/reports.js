import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ReportsContent from "../../components/ReportsContent";
import withAuth from "../../utils/withAuth";


function reports() {
  return (
    <>
      <Head>
        <title>Notificações</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <ReportsContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(reports)
