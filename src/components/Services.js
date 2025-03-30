export default function Services() {
  const services = [
    { icon: "fas fa-heartbeat", title: "Nesciunt Mete", text: "Provident nihil minus qui consequatur non omnis maiores." },
    { icon: "fas fa-pills", title: "Eosle Commodi", text: "Ut autem aut autem non a. Sint sint sit facilis nam iusto sint." },
    { icon: "fas fa-hospital-user", title: "Ledo Markt", text: "Ut excepturi voluptatem nisi sed. Quidem fuga consequatur." },
    { icon: "fas fa-dna", title: "Asperiores Commodit", text: "Non et temporibus minus omnis sed dolor esse consequatur." },
    { icon: "fas fa-wheelchair", title: "Velit Doloremque", text: "Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam." },
    { icon: "fas fa-notes-medical", title: "Dolori Architecto", text: "Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque." },
  ];

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Serviços</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)} key={index}>
              <div className="service-item position-relative">
                <div className="icon"><i className={service.icon}></i></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
