import Head from "next/head";
import Link from "next/link";
import { useState } from "react";


export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    
  return (
    <>
      <Head>
        <title>Login - GoE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            {/* Card */}
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center">
                  <Link href="/dashboard">
                    <span className="app-brand-text demo text-body fw-bolder">GoE</span>
                  </Link>
                </div>

                <h4 className="mb-2">Bem-vindo ao GoE!</h4>

                <form id="formAuthentication" className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Insira teu email"
                      autoFocus
                    />
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <Link href="/auth/forgot-password">
                        <small>Esqueceu senha?</small>
                      </Link>
                    </div>
                    <div className="input-group input-group-merge">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="••••••••"
                          aria-describedby="password"
                        />
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                    >   
                        <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
                </div>
                </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me">
                        Lembrar-me
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Login
                    </button>
                  </div>
                </form>

                <p className="text-center">
                  <span>Novo na plataforma?</span>
                  <Link href="/register">
                    <span> Criar uma nova conta</span>
                  </Link>
                </p>
              </div>
            </div>
            {/* /Card */}
          </div>
        </div>
      </div>
    </>
  );
}
