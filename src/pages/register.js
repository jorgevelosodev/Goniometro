import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Cadastra-se</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <Link href="/">
                    <span className="demo text-body fw-bolder">Cadastra-se</span>
                  </Link>
                </div>

                <form className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Insira o seu nome completo"
                      autoFocus
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="+244 9XX-XXX-XXX"
                      pattern="\+244\s9\d{2}\s\d{3}\s\d{3}"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="idade" className="form-label">Idade</label>
                    <input type="number" className="form-control" id="idade" placeholder="Insira a sua idade" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sexo</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender" id="male" value="male" required />
                      <label className="form-check-label" htmlFor="male">Masculino</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender" id="female" value="female" required />
                      <label className="form-check-label" htmlFor="female">Feminino</label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <textarea className="form-control" id="historico" rows="5" placeholder="Histórico Médico" required></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Insira o seu email" />
                  </div>

                  {/* Senha */}
                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        placeholder="••••••••"
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

                  {/* Confirmar Senha */}
                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                    <div className="input-group input-group-merge">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        className="form-control"
                        placeholder="••••••••"
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={showConfirmPassword ? "bx bx-show" : "bx bx-hide"}></i>
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary d-grid w-100">
                    Registra-se
                  </button>
                </form>

                <p className="text-center">
                  <span>Já tens uma conta?</span>
                  <Link href="/login">
                    <span> Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
