import emailjs from "@emailjs/browser";


export const sendResetPasswordEmail = async (toEmail, resetLink) => {
  try {
    const result = await emailjs.send(
      "service_nn3j623",
      "template_3a3vpnd",
      {
        email: toEmail,
        link: resetLink,
      },
      "08M4E-gCHIw8kEuwg"
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const sendRegistrationEmail = async (toEmail, name, password) => {
  try {
    const result = await emailjs.send(
      "service_nn3j623",
      "template_y0044t8",
      {
        email: toEmail,
        name,
        password,
      },
      "08M4E-gCHIw8kEuwg"
    );
    return result;
  } catch (error) {
    console.error("Erro ao enviar e-mail de cadastro:", error);
    throw error;
  }
};
