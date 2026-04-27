import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+258 84 752 9665",
    href: "https://wa.me/258847529665",
  },
  {
    icon: Mail,
    title: "Email",
    value: "ajuda@trilhoacademico.edu.mz",
    href: "mailto:ajuda@trilhoacademico.edu.mz",
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "Maputo, Moçambique",
    href: "https://maps.google.com/?q=Maputo,Mozambique",
  },
];

const Enquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ nome: "", assunto: "", mensagem: "" });
  };

  return (
    <section className="relative bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-[#0075FE] sm:text-6xl dark:text-[#3FA9FF]">
            Entrar em Contacto
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Envia-nos uma mensagem ou utiliza os nossos contactos diretos para
            falar connosco.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <div className="bg-[#4B41AF] p-8 shadow-lg dark:bg-[#3A3580] dark:shadow-xl">
            <h2 className="mb-8 text-2xl font-bold text-white">
              Formulário de Envio
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-3 block text-sm font-medium text-white dark:text-gray-100"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full border border-white/30 bg-transparent px-4 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors dark:border-white/25 dark:placeholder-white/40"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="mb-3 block text-sm font-medium text-white dark:text-gray-100"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full border border-white/30 bg-transparent px-4 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors dark:border-white/25 dark:placeholder-white/40"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-3 block text-sm font-medium text-white dark:text-gray-100"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none border border-white/30 bg-transparent px-4 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors dark:border-white/25 dark:placeholder-white/40"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#0075FE] to-[#4E3EAB] text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-[#0075FE] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-transparent [border-image:linear-gradient(to_right,#21C45B,#2384FA)_1] w-full"
              >
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>

          {/* Right: Contact Details */}
          <div className="bg-[#4B41AF] p-8 shadow-lg dark:bg-[#3A3580] dark:shadow-xl flex flex-col">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-white dark:text-gray-100">
                Detalhes de Contacto
              </h2>
              <p className="mb-6 text-sm text-white/90 dark:text-gray-300">
                Podes entrar em contacto diretamente connosco através dos canais
                abaixo.
              </p>

              <div className="space-y-4">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-white dark:text-gray-100"
                    >
                      <Icon className="mt-1 h-5 w-5 shrink-0 flex-none" />
                      <div className="flex-1">
                        <p className="font-semibold text-white dark:text-gray-100">{item.title}</p>
                        <p className="text-sm text-white/85 dark:text-gray-300">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 overflow-hidden shadow-lg dark:shadow-2xl">
          <div className="relative">
            <img
              src="/mz-loc2.avif"
              alt="Mapa de localização"
              className="h-80 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="max-w-sm rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md dark:border-white/15 dark:bg-black/30">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 dark:bg-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                  Maputo
                </div>
                <h3 className="text-lg font-bold dark:text-gray-100">Trilho Académico</h3>
                <p className="mt-2 text-xs leading-5 text-white/90 dark:text-gray-300">
                  Um atendimento próximo, claro e moderno para estudantes e
                  famílias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;