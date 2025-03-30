import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <Link href="/" className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Goe</span>
        </Link>
      </div>

      <ul className="menu-inner py-1">
        <li className="menu-item active">
          <Link href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div>Dashboard</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/notifications" className="menu-link">
            <i className="bx bx-bell me-1"></i>
            <div>Notificações</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/connections" className="menu-link">
            <i className="menu-icon tf-icons bx bx-cube-alt"></i>
            <div>Conexão</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
