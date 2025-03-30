import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
      <div className="navbar-nav-right d-flex align-items-center ms-auto">
        <span className="username">Luchazes do Nascimento</span>
        <div className="avatar avatar-online">
          <Image src="/assets/img/avatars/1.png" alt="User" width={40} height={40} className="rounded-circle" />
        </div>
      </div>
    </nav>
  );
}
