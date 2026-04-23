import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  BookOpen,
  // MapPin,
  GraduationCap,
  Upload,
} from "lucide-react";


interface UserProfile {
  id: number;
  phone?: string;
  email?: string;
  name: string;
  username?: string;
  birth_date?: string;
  gender?: string;
  country?: string;
  province?: string;
  bio?: string;
  highest_education?: string;
  school_name?: string;
  school_location?: string;
  curriculum?: string;
  university_name?: string;
  final_average?: string;
  report_card_path?: string;
  profile_image_path?: string;
  created_at?: string;
}

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/routes/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !token) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/routes/users/upload-profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser((prev) => (prev ? { ...prev, profile_image_path: res.data.path } : prev));
      alert("Imagem atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  };

  if (!user)
    return <p className="text-center text-gray-500 mt-20">A carregar perfil...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/explorar")}
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Voltar
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-32 h-32">
            <img
              src={
                preview ||
                (user.profile_image_path
                  ? `${import.meta.env.VITE_API_URL}/${user.profile_image_path}`
                  : "https://i.postimg.cc/3xqP9qqV/view-futuristic-robot-school-environment.jpg")
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer text-white hover:bg-blue-700">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {selectedImage && (
            <button
              onClick={handleImageUpload}
              disabled={uploading}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              {uploading ? "A carregar..." : "Atualizar Imagem"}
            </button>
          )}

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            {user.name}
          </h1>
          {user.username && (
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          )}
          {user.bio && (
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xl">
              {user.bio}
            </p>
          )}
        </div>

        <div className="space-y-8">
          {/* Personal Info */}
          <section>
            <h2 className="flex items-center text-xl font-semibold text-blue-600 mb-3">
              <User className="w-5 h-5 mr-2" /> Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p><strong>Email:</strong> {user.email || "-"}</p>
              <p><strong>Telefone:</strong> {user.phone || "-"}</p>
              <p><strong>Data de Nascimento:</strong> {user.birth_date || "-"}</p>
              <p><strong>Gênero:</strong> {user.gender || "-"}</p>
              <p><strong>País:</strong> {user.country || "-"}</p>
              <p><strong>Província:</strong> {user.province || "-"}</p>
            </div>
          </section>

          {/* Academic Info */}
          <section>
            <h2 className="flex items-center text-xl font-semibold text-blue-600 mb-3">
              <GraduationCap className="w-5 h-5 mr-2" /> Informação Acadêmica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p><strong>Nível de Educação:</strong> {user.highest_education || "-"}</p>
              <p>
                <strong>Instituição:</strong>{" "}
                {user.school_name || user.university_name || "-"}
              </p>
              <p><strong>Localização:</strong> {user.school_location || "-"}</p>
              <p><strong>Currículo:</strong> {user.curriculum || "-"}</p>
              <p><strong>Média Final:</strong> {user.final_average || "-"}</p>
              {user.report_card_path && (
                <p>
                  <strong>Boletim:</strong>{" "}
                  <a
                    href={`${import.meta.env.VITE_API_URL}/${user.report_card_path}`}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Ver documento
                  </a>
                </p>
              )}
            </div>
          </section>

          {/* Account Info */}
          <section>
            <h2 className="flex items-center text-xl font-semibold text-blue-600 mb-3">
              <BookOpen className="w-5 h-5 mr-2" /> Detalhes da Conta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p><strong>Conta criada em:</strong>{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("pt-PT")
                  : "-"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
