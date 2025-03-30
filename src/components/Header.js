import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('#hero');

  return (
    <header id="header" className="header sticky-top">
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">GoE</h1>
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link 
                  href="#hero" 
                  className={activeSection === '#hero' ? 'active' : ''} 
                  onClick={() => setActiveSection('#hero')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className={activeSection === '#services' ? 'active' : ''} 
                  onClick={() => setActiveSection('#services')}
                >
                  Serviços
                </Link>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <Link href="/login" className="cta-btn d-none d-sm-block">Faça Login</Link>
        </div>
      </div>
    </header>
  );
}
