import React, { useState } from "react";
import {
  // User,
  Users,
  MessageCircle,
  Plus,
  Paperclip,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Video,
} from "lucide-react";

// Interfaces
interface Message {
  id: string;
  user: string;
  avatar?: string;
  content: string;
  timestamp: string;
  image?: string;
  replies?: Message[];
}

interface SubChannel {
  id: string;
  name: string;
  messages: Message[];
}

interface Channel {
  id: string;
  name: string;
  subChannels: SubChannel[];
  isOpen?: boolean;
}

interface Case {
  id: string;
  user: string;
  phone: string;
  university: string;
  country: string;
  content: string;
  timestamp: string;
}

interface Testimony {
  id: string;
  user: string;
  country: string;
  university: string;
  content?: string;
  video?: string;
  timestamp: string;
}

const ChatCommunity: React.FC = () => {
  // State
  const [channels, setChannels] = useState<Channel[]>([
  {
    id: "1",
    name: "Moçambique",
    subChannels: [
      { id: "1-1", name: "#Maputo", messages: [] },
      { id: "1-2", name: "#UniversidadeEduardoMondlane", messages: [] },
      { id: "1-3", name: "#Beira", messages: [] },
      { id: "1-4", name: "#UniversidadeLurio", messages: [] },
    ],
  },
  {
    id: "2",
    name: "África do Sul",
    subChannels: [
      { id: "2-1", name: "#CapeTown", messages: [] },
      { id: "2-2", name: "#UniversidadeCidadeDoCabo", messages: [] }, // UCT
      { id: "2-3", name: "#Witswatersrand", messages: [] }, // Wits
      { id: "2-4", name: "#Stellenbosch", messages: [] },
      { id: "2-5", name: "#Pretoria", messages: [] },
    ],
  },
  {
    id: "3",
    name: "Portugal",
    subChannels: [
      { id: "3-1", name: "#Lisboa", messages: [] },
      { id: "3-2", name: "#UniversidadeLisboa", messages: [] },
      { id: "3-3", name: "#Porto", messages: [] },
      { id: "3-4", name: "#UniversidadePorto", messages: [] },
      { id: "3-5", name: "#Coimbra", messages: [] },
    ],
  },
  {
    id: "4",
    name: "Chipre",
    subChannels: [
      { id: "4-1", name: "#Nicósia", messages: [] },
      { id: "4-2", name: "#UniversidadeChipre", messages: [] },
      { id: "4-3", name: "#UniversidadeEuropeiaChipre", messages: [] },
    ],
  },
  {
    id: "5",
    name: "Alemanha",
    subChannels: [
      { id: "5-1", name: "#Berlim", messages: [] },
      { id: "5-2", name: "#Munique", messages: [] },
      { id: "5-3", name: "#UniversidadeTecnicaMunique", messages: [] },
      { id: "5-4", name: "#Heidelberg", messages: [] },
      { id: "5-5", name: "#UniversidadeHeidelberg", messages: [] },
    ],
  },
  {
    id: "6",
    name: "Malásia",
    subChannels: [
      { id: "6-1", name: "#KualaLumpur", messages: [] },
      { id: "6-2", name: "#UniversidadeMalaya", messages: [] },
      { id: "6-3", name: "#UniversidadeTecnologicaMalasia", messages: [] },
      { id: "6-4", name: "#Penang", messages: [] },
    ],
  },
  {
    id: "7",
    name: "Polónia",
    subChannels: [
      { id: "7-1", name: "#Varsóvia", messages: [] },
      { id: "7-2", name: "#UniversidadeVarsovia", messages: [] },
      { id: "7-3", name: "#Cracóvia", messages: [] },
      { id: "7-4", name: "#UniversidadeJaguelónica", messages: [] },
      { id: "7-5", name: "#Gdańsk", messages: [] },
    ],
  },
  {
    id: "8",
    name: "Estados Unidos da América",
    subChannels: [
      { id: "8-1", name: "#NovaIorque", messages: [] },
      { id: "8-2", name: "#UniversidadeHarvard", messages: [] },
      { id: "8-3", name: "#UniversidadeMIT", messages: [] },
      { id: "8-4", name: "#LosAngeles", messages: [] },
      { id: "8-5", name: "#UniversidadeUCLA", messages: [] },
      { id: "8-6", name: "#Chicago", messages: [] },
    ],
  },
  {
    id: "9",
    name: "Espanha",
    subChannels: [
      { id: "9-1", name: "#Madrid", messages: [] },
      { id: "9-2", name: "#UniversidadeComplutenseMadrid", messages: [] },
      { id: "9-3", name: "#Barcelona", messages: [] },
      { id: "9-4", name: "#UniversidadeBarcelona", messages: [] },
      { id: "9-5", name: "#Valência", messages: [] },
    ],
  },
  {
    id: "10",
    name: "Brasil",
    subChannels: [
      { id: "10-1", name: "#SãoPaulo", messages: [] },
      { id: "10-2", name: "#UniversidadeUSP", messages: [] },
      { id: "10-3", name: "#RioDeJaneiro", messages: [] },
      { id: "10-4", name: "#UniversidadeUFRJ", messages: [] },
      { id: "10-5", name: "#Brasília", messages: [] },
    ],
  },
  {
    id: "11",
    name: "Reino Unido",
    subChannels: [
      { id: "11-1", name: "#Londres", messages: [] },
      { id: "11-2", name: "#UniversidadeOxford", messages: [] },
      { id: "11-3", name: "#UniversidadeCambridge", messages: [] },
      { id: "11-4", name: "#Manchester", messages: [] },
      { id: "11-5", name: "#UniversidadeImperialCollege", messages: [] },
    ],
  },
  {
    id: "12",
    name: "Índia",
    subChannels: [
      { id: "12-1", name: "#NovaDeli", messages: [] },
      { id: "12-2", name: "#UniversidadeDelhi", messages: [] },
      { id: "12-3", name: "#Mumbai", messages: [] },
      { id: "12-4", name: "#UniversidadeMumbai", messages: [] },
      { id: "12-5", name: "#Bangalore", messages: [] },
      { id: "12-6", name: "#IITBombay", messages: [] },
    ],
  },
]);

// Map country names to flag emojis
const countryFlags: Record<string, string> = {
  "Moçambique": "/flags/Mz.jpg",
  "África do Sul": "/flags/Za.jpg",
  "Portugal": "/flags/Pt.jpg",
  "Chipre": "/flags/Cy.jpg",
  "Alemanha": "/flags/De.jpg",
  "Malásia": "/flags/my.png",
  "Polónia": "/flags/Pl.jpg",
  "Estados Unidos da América": "/flags/Usa.jpg",
  "Espanha": "/flags/Sp.jpg",
  "Brasil": "/flags/Br.jpg",
  "Reino Unido": "/flags/Uk.png",
  "Índia": "/flags/In.webp",
};


  const [activeChannelId, setActiveChannelId] = useState<string>("1");
  const [activeSubChannelId, setActiveSubChannelId] = useState<string>("1-1");
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<"community" | "help" | "testimony">(
    "community"
  );

  // Help Section State
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("Moçambique");
  const [caseForm, setCaseForm] = useState({
    name: "",
    phone: "",
    university: "",
    description: "",
  });

  // Testimony Section State
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      id: "t1",
      user: "João Silva",
      country: "Portugal",
      university: "Universidade de Lisboa",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      timestamp: new Date().toLocaleTimeString("pt-PT"),
    },
    {
      id: "t2",
      user: "Maria Santos",
      country: "África do Sul",
      university: "UCT",
      content: "A minha experiência tem sido incrível, aprendi muito!",
      timestamp: new Date().toLocaleTimeString("pt-PT"),
    },
  ]);
  const [testimonyForm, setTestimonyForm] = useState({
    name: "",
    country: "Moçambique",
    university: "",
    content: "",
    video: null as File | null,
  });

  const activeChannel = channels.find((c) => c.id === activeChannelId);
  const activeSubChannel = activeChannel?.subChannels.find(
    (sc) => sc.id === activeSubChannelId
  );

  // Enviar mensagem
  const sendMessage = () => {
    if (!newMessage.trim() && !imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const message: Message = {
        id: Date.now().toString(),
        user: "Tu",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("pt-PT"),
        image: imageFile ? imageData : undefined,
        replies: [],
      };

      setChannels((prev) =>
        prev.map((c) =>
          c.id === activeChannelId
            ? {
                ...c,
                subChannels: c.subChannels.map((sc) =>
                  sc.id === activeSubChannelId
                    ? replyTo
                      ? {
                          ...sc,
                          messages: sc.messages.map((m) =>
                            m.id === replyTo.id
                              ? {
                                  ...m,
                                  replies: [...(m.replies || []), message],
                                }
                              : m
                          ),
                        }
                      : { ...sc, messages: [...sc.messages, message] }
                    : sc
                ),
              }
            : c
        )
      );

      setNewMessage("");
      setImageFile(null);
      setReplyTo(null);
    };

    if (imageFile) reader.readAsDataURL(imageFile);
    else reader.onload?.({} as any);
  };

  // Submeter caso
  const submitCase = () => {
    if (
      !caseForm.name.trim() ||
      !caseForm.phone.trim() ||
      !caseForm.university.trim() ||
      !caseForm.description.trim()
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newCase: Case = {
      id: Date.now().toString(),
      user: caseForm.name,
      phone: caseForm.phone,
      university: caseForm.university,
      country: selectedCountry,
      content: caseForm.description,
      timestamp: new Date().toLocaleTimeString("pt-PT"),
    };

    setCases((prev) => [...prev, newCase]);
    setCaseForm({ name: "", phone: "", university: "", description: "" });
    alert("Caso registado com sucesso!");
  };

  // Submeter testemunho
  const submitTestimony = () => {
    if (
      !testimonyForm.name.trim() ||
      !testimonyForm.university.trim() ||
      (!testimonyForm.content.trim() && !testimonyForm.video)
    ) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    let videoUrl: string | undefined;
    if (testimonyForm.video) {
      videoUrl = URL.createObjectURL(testimonyForm.video);
    }

    const newTestimony: Testimony = {
      id: Date.now().toString(),
      user: testimonyForm.name,
      country: testimonyForm.country,
      university: testimonyForm.university,
      content: testimonyForm.content || undefined,
      video: videoUrl,
      timestamp: new Date().toLocaleTimeString("pt-PT"),
    };

    setTestimonies((prev) => [newTestimony, ...prev]);
    setTestimonyForm({
      name: "",
      country: "Moçambique",
      university: "",
      content: "",
      video: null,
    });
  };

  const [modalVideo, setModalVideo] = useState<string | null>(null);

  const openModal = (videoUrl: string) => setModalVideo(videoUrl);
  const closeModal = () => setModalVideo(null);

  const students = [
    { id: 1, user: "Ana Costa", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Foi uma experiência incrível, recomendo a todos!", video: "/videos/ana.mp4", rating: 5, timestamp: "2025-09-23", profile: "/students/ana.jpg" },
    { id: 2, user: "David Smith", university: "University of Cape Town", country: "África do Sul", content: "Aprendi imenso e conheci pessoas fantásticas.", video: "/videos/david.mp4", rating: 4, timestamp: "2025-09-22", profile: "/students/david.jpg" },
    { id: 3, user: "Miguel Oliveira", university: "Universidade de Lisboa", country: "Portugal", content: "O suporte e as atividades foram ótimas.", video: "/videos/miguel.mp4", rating: 5, timestamp: "2025-09-21", profile: "/students/miguel.jpg" },
    { id: 4, user: "Sara Martins", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Adorei cada momento!", video: "/videos/sara.mp4", rating: 4, timestamp: "2025-09-20", profile: "/students/sara.jpg" },
    { id: 5, user: "John Doe", university: "University of Cape Town", country: "África do Sul", content: "A experiência foi incrível, totalmente recomendada.", video: "/videos/john.mp4", rating: 5, timestamp: "2025-09-19", profile: "/students/john.jpg" },
    { id: 6, user: "Carla Silva", university: "Universidade de Lisboa", country: "Portugal", content: "O curso superou minhas expectativas!", video: "/videos/carla.mp4", rating: 4, timestamp: "2025-09-18", profile: "/students/carla.jpg" },
    { id: 7, user: "Tomás Ferreira", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Recomendo a todos que querem aprender de forma prática.", video: "/videos/tomas.mp4", rating: 5, timestamp: "2025-09-17", profile: "/students/tomas.jpg" },
    { id: 8, user: "Emily Johnson", university: "University of Cape Town", country: "África do Sul", content: "Excelente ambiente de aprendizagem.", video: "/videos/emily.mp4", rating: 4, timestamp: "2025-09-16", profile: "/students/emily.jpg" },
    { id: 9, user: "Rui Lopes", university: "Universidade de Lisboa", country: "Portugal", content: "O feedback dos professores foi muito útil.", video: "/videos/rui.mp4", rating: 5, timestamp: "2025-09-15", profile: "/students/rui.jpg" },
    { id: 10, user: "Isabel Gomes", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Uma experiência inesquecível.", video: "/videos/isabel.mp4", rating: 5, timestamp: "2025-09-14", profile: "/students/isabel.jpg" },
    { id: 11, user: "Michael Brown", university: "University of Cape Town", country: "África do Sul", content: "Aprendi técnicas muito úteis.", video: "/videos/michael.mp4", rating: 4, timestamp: "2025-09-13", profile: "/students/michael.jpg" },
    { id: 12, user: "Helena Rodrigues", university: "Universidade de Lisboa", country: "Portugal", content: "Professores muito acessíveis e dedicados.", video: "/videos/helena.mp4", rating: 5, timestamp: "2025-09-12", profile: "/students/helena.jpg" },
    { id: 13, user: "Pedro Nunes", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "A estrutura do curso foi excelente.", video: "/videos/pedro.mp4", rating: 4, timestamp: "2025-09-11", profile: "/students/pedro.jpg" },
    { id: 14, user: "Sophia White", university: "University of Cape Town", country: "África do Sul", content: "Muito conteúdo relevante e prático.", video: "/videos/sophia.mp4", rating: 5, timestamp: "2025-09-10", profile: "/students/sophia.jpg" },
    { id: 15, user: "Lucas Pinto", university: "Universidade de Lisboa", country: "Portugal", content: "Adorei cada atividade e workshop.", video: "/videos/lucas.mp4", rating: 4, timestamp: "2025-09-09", profile: "/students/lucas.jpg" },
    { id: 16, user: "Maria Fernandes", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Experiência muito enriquecedora!", video: "/videos/maria.mp4", rating: 5, timestamp: "2025-09-08", profile: "/students/maria.jpg" },
    { id: 17, user: "Daniel Silva", university: "University of Cape Town", country: "África do Sul", content: "Os vídeos foram muito esclarecedores.", video: "/videos/daniel.mp4", rating: 4, timestamp: "2025-09-07", profile: "/students/daniel.jpg" },
    { id: 18, user: "Clara Sousa", university: "Universidade de Lisboa", country: "Portugal", content: "Ambiente ótimo para networking.", video: "/videos/clara.mp4", rating: 5, timestamp: "2025-09-06", profile: "/students/clara.jpg" },
    { id: 19, user: "Nuno Carvalho", university: "Universidade Eduardo Mondlane", country: "Moçambique", content: "Aprendi muito em pouco tempo.", video: "/videos/nuno.mp4", rating: 4, timestamp: "2025-09-05", profile: "/students/nuno.jpg" },
    { id: 20, user: "Alice Thompson", university: "University of Cape Town", country: "África do Sul", content: "Uma experiência realmente única.", video: "/videos/alice.mp4", rating: 5, timestamp: "2025-09-04", profile: "/students/alice.jpg" },
    { id: 21, user: "Alice Thompson", university: "University of Cape Town", country: "África do Sul", content: "Uma experiência realmente única.", video: "/videos/alice.mp4", rating: 5, timestamp: "2025-09-04", profile: "/students/alice.jpg" },,
  ];


  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <nav className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {[
          { key: "community", label: "Comunidade" },
          { key: "help", label: "Preciso de Ajuda" },
          { key: "testimony", label: "Testemunhos" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 p-3 text-center font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
              activeTab === tab.key ? "bg-blue-600 text-white rounded-t-lg" : ""
            }`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* ======================= COMUNIDADE ======================= */}
        {activeTab === "community" && (
          <>
            {/* Sidebar */}
            <div
              className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex flex-col`}
            >
              <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-lg">Canais</h2>
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                  <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto">
                {channels.map((channel) => (
                  <div key={channel.id}>
                    <button
                      onClick={() =>
                        setChannels((prev) =>
                          prev.map((c) =>
                            c.id === channel.id ? { ...c, isOpen: !c.isOpen } : c
                          )
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{channel.name}</span>
                      </div>
                      {channel.isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {channel.isOpen && (
                      <div className="pl-8 mt-1 space-y-1">
                        {channel.subChannels.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveChannelId(channel.id);
                              setActiveSubChannelId(sub.id);
                              setSidebarOpen(false);
                            }}
                            className={`block w-full text-left px-2 py-1 rounded-lg ${
                              activeSubChannelId === sub.id
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col lg:ml-64">
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                    <Menu className="w-6 h-6" />
                  </button>
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="font-semibold text-lg">
                    {activeChannel?.name} {activeSubChannel ? `- ${activeSubChannel.name}` : ""}
                  </h3>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Estudantes Online: {activeSubChannel?.messages.length || 0}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeSubChannel?.messages.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Sem mensagens. Diz olá! 👋
                    </p>
                  ) : (
                    activeSubChannel.messages.map((msg) => (
                      <div key={msg.id} className="flex flex-col space-y-2">
                        <div className="flex space-x-3 items-start">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                            {countryFlags[msg.userCountry || activeChannel?.name] || "👤"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{msg.user}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {msg.timestamp}
                              </span>
                              <button
                                onClick={() => setReplyTo(msg)}
                                className="ml-auto text-blue-600 dark:text-blue-400 text-xs hover:underline"
                              >
                                Responder
                              </button>
                            </div>
                            <p>{msg.content}</p>
                            {msg.image && (
                              <img
                                src={msg.image}
                                alt="attachment"
                                className="mt-2 max-w-xs rounded-lg"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex space-x-2 items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escreve uma mensagem..."
                    className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                  <label className="cursor-pointer px-2 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <Paperclip className="w-5 h-5" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ======================= PRECISO DE AJUDA ======================= */}
        {activeTab === "help" && (
  <div className="flex-1 p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      Registar Pedido de Ajuda
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2">
        {/* Country Selector */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            País
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border rounded-2xl p-3 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
          >
            <option>Moçambique</option>
            <option>África do Sul</option>
            <option>Portugal</option>
            <option>Chipre</option>
            <option>Alemanha</option>
            <option>Malásia</option>
            <option>Polónia</option>
            <option>Estados Unidos da América</option>
            <option>Espanha</option>
            <option>Brasil</option>
            <option>Reino Unido</option>
            <option>Índia</option>
          </select>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={caseForm.name}
            onChange={(e) => setCaseForm({ ...caseForm, name: e.target.value })}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
          />
          <input
            type="text"
            placeholder="Número de Telefone"
            value={caseForm.phone}
            onChange={(e) => setCaseForm({ ...caseForm, phone: e.target.value })}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
          />
          <input
            type="text"
            placeholder="Universidade"
            value={caseForm.university}
            onChange={(e) =>
              setCaseForm({ ...caseForm, university: e.target.value })
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
          />
          <textarea
            placeholder="Descreve o problema ou pedido de ajuda..."
            value={caseForm.description}
            onChange={(e) =>
              setCaseForm({ ...caseForm, description: e.target.value })
            }
            className="w-full border rounded-xl p-3 resize-none h-32 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
          />
        </div>

        <button
          onClick={submitCase}
          className="mb-8 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg font-semibold transition"
        >
          Submeter Pedido
        </button>

        {/* Display Cases */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Pedidos na região selecionada ({selectedCountry})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {cases
              .filter((c) => c.country === selectedCountry)
              .map((c) => (
                <div
                  key={c.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between hover:scale-105 transform transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                      {c.user}
                    </h4>
                    {c.priority && (
                      <span className="px-2 py-1 bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-100 rounded-full text-xs font-semibold">
                        {c.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {c.university} - {c.phone}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mb-3">
                    {c.content}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
                    {c.timestamp}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts Sidebar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-fit">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Contactos de Emergência
        </h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-200">
          {(() => {
            switch (selectedCountry) {
              case "Moçambique":
                return (
                  <>
                    <li>Polícia: 117</li>
                    <li>Bombeiros: 118</li>
                    <li>Ambulância: 119</li>
                    <li>Emergência Geral: 112</li>
                  </>
                );
              case "África do Sul":
                return (
                  <>
                    <li>Polícia: 10111</li>
                    <li>Bombeiros: 10177</li>
                    <li>Ambulância: 10177</li>
                    <li>Emergência Geral: 112</li>
                  </>
                );
              case "Portugal":
                return (
                  <>
                    <li>Polícia: 112</li>
                    <li>Bombeiros: 112</li>
                    <li>Ambulância: 112</li>
                  </>
                );
              case "Chipre":
                return (
                  <>
                    <li>Polícia: 112</li>
                    <li>Bombeiros: 112</li>
                    <li>Ambulância: 112</li>
                  </>
                );
              case "Alemanha":
                return (
                  <>
                    <li>Polícia: 110</li>
                    <li>Bombeiros: 112</li>
                    <li>Ambulância: 112</li>
                  </>
                );
              case "Malásia":
                return (
                  <>
                    <li>Polícia: 999</li>
                    <li>Bombeiros: 994</li>
                    <li>Ambulância: 991</li>
                  </>
                );
              case "Polónia":
                return (
                  <>
                    <li>Polícia: 997</li>
                    <li>Bombeiros: 998</li>
                    <li>Ambulância: 999</li>
                  </>
                );
              case "Estados Unidos da América":
                return (
                  <>
                    <li>Emergência Geral: 911</li>
                  </>
                );
              case "Espanha":
                return (
                  <>
                    <li>Polícia: 091</li>
                    <li>Bombeiros: 080</li>
                    <li>Ambulância: 112</li>
                  </>
                );
              case "Brasil":
                return (
                  <>
                    <li>Polícia: 190</li>
                    <li>Bombeiros: 193</li>
                    <li>Ambulância: 192</li>
                  </>
                );
              case "Reino Unido":
                return (
                  <>
                    <li>Emergência Geral: 999</li>
                  </>
                );
              case "Índia":
                return (
                  <>
                    <li>Polícia: 100</li>
                    <li>Bombeiros: 101</li>
                    <li>Ambulância: 102</li>
                  </>
                );
              default:
                return <li>Informação indisponível</li>;
            }
          })()}
        </ul>
      </div>
    </div>
  </div>
)}



        {/* ======================= TESTEMUNHOS ======================= */}
        {activeTab === "testimony" && (
          <div className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Partilha a tua experiência
      </h2>

      {/* Testimony Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={testimonyForm.name}
            onChange={(e) =>
              setTestimonyForm({ ...testimonyForm, name: e.target.value })
            }
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
          <select
            value={testimonyForm.country}
            onChange={(e) =>
              setTestimonyForm({ ...testimonyForm, country: e.target.value })
            }
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          >
            <option>Moçambique</option>
            <option>África do Sul</option>
            <option>Portugal</option>
          </select>
          <input
            type="text"
            placeholder="Universidade"
            value={testimonyForm.university}
            onChange={(e) =>
              setTestimonyForm({ ...testimonyForm, university: e.target.value })
            }
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
          <textarea
            placeholder="Mensagem (opcional se estiveres a enviar vídeo)"
            value={testimonyForm.content}
            onChange={(e) =>
              setTestimonyForm({ ...testimonyForm, content: e.target.value })
            }
            className="w-full border p-3 rounded-xl resize-none h-28 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <label className="flex items-center cursor-pointer bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            <Video className="w-5 h-5 mr-2" />
            Adicionar Vídeo
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) =>
                setTestimonyForm({
                  ...testimonyForm,
                  video: e.target.files?.[0] || null,
                })
              }
            />
          </label>
          {testimonyForm.video && (
            <span className="text-sm text-gray-600">{testimonyForm.video.name}</span>
          )}
          <button
            onClick={submitTestimony}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition"
          >
            Submeter Testemunho
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col hover:scale-105 transform transition"
          >
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={t.profile}
                alt={t.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{t.user}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.university} - {t.country}
                </p>
              </div>
            </div>

            {/* Testimony Content */}
            {t.content && <p className="text-gray-700 dark:text-gray-200 mb-4">{t.content}</p>}

            {/* Video Thumbnail */}
            {t.video && (
              <div
                onClick={() => openModal(t.video)}
                className="rounded-xl mb-4 w-full max-h-48 overflow-hidden cursor-pointer relative"
              >
                <video className="w-full object-cover rounded-xl" muted>
                  <source src={t.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.5 5v10l8-5-8-5z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < t.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.954a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.954c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.954a1 1 0 00-.364-1.118L2.068 9.38c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.954z" />
                </svg>
              ))}
            </div>

            {/* Timestamp */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">{t.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-3xl">
            <video controls autoPlay className="w-full rounded-xl">
              <source src={modalVideo} type="video/mp4" />
            </video>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
        )}
      </div>
    </div>
  );
};

export default ChatCommunity;
