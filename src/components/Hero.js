import Image from "next/image";

export default function Hero() {

  return (
    <section id="hero" className="hero section light-background">
      <Image src="/assets/img/hero-bg.jpg" alt="Hero" layout="responsive" width={1920} height={1080} />

      <div className="container position-relative">
        <div className="welcome position-relative" data-aos="fade-up" data-aos-delay="1000">
          <h2>SEJA BEM-VINDO AO GoE</h2>
          <p>Uma solução inovadora que visa ajudar a melhorar a qualidade de vida dos nossos pacientes.</p>
        </div>

        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
              <h3>O que é o GoE?</h3>
              <p>
              É uma plataforma que visa auxiliar o manuseamento do Goniômetro Electrónico.
              </p>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                    <i className="bi-clock"></i>
                    <h4></h4>
                    <p>Visualização dos dados em Tempo Real</p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                    <i className="bi bi-person"></i>
                    <h4></h4>
                    <p>Monitoramento dos Pacientes</p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                    <i className="bi-rulers"></i>
                    <h4></h4>
                    <p>Medições Padronizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </section>
  );
}
