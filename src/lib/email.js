import emailjs from "@emailjs/browser";

export const sendResetPasswordEmail = async (toEmail, resetLink) => {
  try {
    const result = await emailjs.send(
      "service_nn3j623",        // ex: service_xxxxxx
      "template_3a3vpnd",       // ex: template_reset_password
      {
        email: toEmail,
        link: resetLink,
      },
      "08M4E-gCHIw8kEuwg"         // ex: public_ABC123
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const sendRegistrationEmail = async (toEmail, name, password) => {
  try {
    const result = await emailjs.send(
      "service_nn3j623",         // seu service ID
      "template_y0044t8", // seu novo template ID
      {
        email: toEmail,
        name,
        password,
      },
      "08M4E-gCHIw8kEuwg"         // seu public key
    );
    return result;
  } catch (error) {
    console.error("Erro ao enviar e-mail de cadastro:", error);
    throw error;
  }
};
