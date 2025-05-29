import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import withAuth from "../../utils/withAuth";
import ProfileContentAdmin from "../../components/AdminContent";

function ProfileAdmin() {
  return (
    <>
      <Head>
        <title>Perfil Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <ProfileContentAdmin />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ProfileAdmin)
