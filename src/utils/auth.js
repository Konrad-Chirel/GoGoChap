import toast from "react-hot-toast";

export function logout(navigate) {
  // Confirmation
  const confirmed = window.confirm("Souhaitez-vous vraiment vous déconnecter ?");

  if (confirmed) {
    // Nettoyage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");

    // Notification
    toast.success("Vous avez été déconnecté avec succès.");

    // Redirection
    navigate("/login");
  }
}
