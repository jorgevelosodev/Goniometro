import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

export async function initMedico() {

  const email = "anaSampaio@gmail.com";

  // Verifica se o médico já existe
  const { data: existente, error: erroBusca } = await supabase
    .from("usuarios")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (erroBusca) {
    console.error("Erro ao verificar existência do médico:", erroBusca.message);
    return;
  }

  if (existente) {
    console.log("✅ Médico já existe. Nenhuma ação necessária.");
    return;
  }

  const senhaCriptografada = await bcrypt.hash("1234567890", 10);

  const { error } = await supabase.from("usuarios").insert([
    {
      nome: "Dra. Ana Sampaio",
      email,
      telefone: "943821942",
      senha: senhaCriptografada,
      nivelacesso: "medico",
      especialidade: "Fisioterapia",
      clinicAddress: "Rua das Clínicas, 123 - São Paulo",
    },
  ]);

  if (error) {
    console.error("❌ Erro ao criar médico:", error.message);
  } else {
    console.log("✅ Médico criado com sucesso:", email);
  }
}
