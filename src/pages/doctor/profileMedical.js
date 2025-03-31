import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import SettingsMedical from "../../components/settingsMedical";
import withAuth from "../../utils/withAuth";

function ProfileMedical() {
  return (
    <>
      <Head>
        <title>Perfil Médico</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <SettingsMedical />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ProfileMedical)
