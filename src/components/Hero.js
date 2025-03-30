import Image from "next/image";

export default function Hero() {

  return (
    <section id="hero" className="hero section light-background">
      <Image src="/assets/img/hero-bg.jpg" alt="Hero" layout="responsive" width={1920} height={1080} />

      <div className="container position-relative">
        <div className="welcome position-relative" data-aos="fade-up" data-aos-delay="1000">
          <h2>WELCOME TO MEDILAB</h2>
          <p>We are a team of talented designers making websites with Bootstrap</p>
        </div>

        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
              <h3>Why Choose Medilab?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <div className="text-center">
                <a href="#about" className="more-btn">
                  <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Corporis voluptates officia eiusmod</h4>
                    <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                    <i className="bi bi-gem"></i>
                    <h4>Ullamco laboris ladore pan</h4>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                    <i className="bi bi-inboxes"></i>
                    <h4>Labore consequatur incidid dolore</h4>
                    <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
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
