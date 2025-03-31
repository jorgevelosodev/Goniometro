import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";
import withAuth from "../../utils/withAuth";

function ListUser() {
  return (
    <>
      <Head>
        <title>Lista de Usuários</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ListUser)
