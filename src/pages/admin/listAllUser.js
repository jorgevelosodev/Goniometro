import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ListAllUser from "../../components/ListAllUser";
import withAuth from "../../utils/withAuth";

function ListAllUsers() {
  return (
    <>
      <Head>
        <title>Lista de Médicos</title>
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <ListAllUser />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ListAllUsers);
