import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Lock,
  Upload,
  Save,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser } from "@/contexts/user-context";

const SettingsPage = () => {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user.profileImage) {
      setImagePreview(user.profileImage);
    } else {
      setImagePreview(null);
    }
  }, [user.profileImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    // Mise à jour du contexte utilisateur
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage
        ? URL.createObjectURL(formData.profileImage)
        : prev.profileImage,
      // Ajoute ici le mot de passe si tu enregistres côté serveur
    }));

    toast.success("Modifications enregistrées !");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Paramètres du profil</h2>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Photo de profil"
              className="object-cover w-full h-full"
            />
          ) : (
            <UserCircle className="text-gray-400 w-20 h-20" />
          )}
        </div>
        <label className="cursor-pointer text-sm font-medium flex items-center gap-2 text-blue-600">
          <Upload className="w-4 h-4" />
          Changer la photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nom</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <UserCircle className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Confirmer le mot de passe</label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
          >
            <Save className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
