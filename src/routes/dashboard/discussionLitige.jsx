import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DiscussionLitige({onClose}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const litiges = location.state?.litige;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [litigeTraite, setLitigeTraite] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const messageEndRef = useRef(null);

  const storageKey = `messages_litige_${litiges?.id || "default"}`;

 useEffect(() => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.length > 0) {
      setMessages(parsed);
    } else {
      setMessages([
        {
          id: 1,
          sender: "client",
          name: litiges?.nom || "Client",
          avatar: litiges?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
          content: litiges?.message || "Bonjour, j’ai un souci avec ma commande.",
          time: new Date().toISOString(),
        },
      ]);
    }
  } else {
    setMessages([
      {
        id: 1,
        sender: "client",
        name: litiges?.nom || "Client",
        avatar: litiges?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
        content: litiges?.message || "Bonjour, j’ai un souci avec ma commande.",
        time: new Date().toISOString(),
      },
    ]);
  }
}, [storageKey, litiges]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, storageKey]);

  const formatTime = (iso) => {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return "à l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
    return `il y a ${Math.floor(diff / 86400)} jour(s)`;
  };

  const handleSend = () => {
    if (!newMessage.trim() || litigeTraite) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "admin",
        name: "Administrateur",
        avatar: "/admin-avatar.png",
        content: newMessage,
        time: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  const handleTraiter = () => {
    if (window.confirm("Confirmer que ce litige a été traité ?")) {
      setLitigeTraite(true);
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: "admin",
          name: "Administrateur",
          avatar: "/admin-avatar.png",
          content: "<span class='text-green-500 font-semibold'>✅ Ce litige a été traité.</span>",
          time: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleEdit = (msg) => {
    setEditingId(msg.id);
    setEditedContent(msg.content);
  };

  const saveEdit = () => {
    setMessages(messages.map((m) => (
      m.id === editingId ? { ...m, content: editedContent } : m
    )));
    setEditingId(null);
    setEditedContent("");
  };

  if (!litiges) return <p className="text-center p-4 text-gray-500">Aucun litige sélectionné.</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* En-tête */}
      <div className="bg-white shadow p-4 border-b flex justify-between items-start">
        <button onClick={()=>navigate(-1)} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          <span>←</span> Retour
        </button>
        <div className="text-right">
  <h1 className="font-bold text-sm sm:text-sm md:text-base lg:text-lg">
  Discussion avec {litiges.auteur || litiges.nom || "Utilisateur"}
</h1>


          {litigeTraite && <p className="text-sm text-green-600 font-semibold">Litige marqué comme traité</p>}
        </div>
   <button
  onClick={handleTraiter}
  disabled={litigeTraite}
  className="text-xs sm:text-sm md:text-base text-green-700 hover:underline"
>
  Marquer comme traité
</button>


      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-md ${msg.sender === "admin" ? "flex-row-reverse" : ""}`}>
              <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              <div className={`p-3 rounded-lg relative text-sm ${msg.sender === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                <p className="font-semibold mb-1">{msg.name}</p>
                {editingId === msg.id ? (
                  <>
                    <input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="text-black w-full mb-2 p-1 rounded" />
                    <button onClick={saveEdit} className="text-xs text-green-300 mr-2">Sauvegarder</button>
                    <button onClick={() => setEditingId(null)} className="text-xs text-red-300">Annuler</button>
                  </>
                ) : (
                  <>
                    <p dangerouslySetInnerHTML={{ __html: msg.content }}></p>
                    <span className="text-xs block mt-1 text-gray-300">{formatTime(msg.time)}</span>
                    {msg.sender === "admin" && !litigeTraite && (
                      <div className="absolute top-1 right-2 flex gap-2">
                        <button onClick={() => handleEdit(msg)} className="text-white text-xs">✏️</button>
                        <button onClick={() => handleDelete(msg.id)} className="text-red-300 text-xs">🗑️</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Champ de réponse */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={litigeTraite}
          placeholder={litigeTraite ? "Litige traité." : "Écrivez un message..."}
          className="flex-1 px-4 py-2 border rounded-full"
        />
        <button
          onClick={handleSend}
          disabled={litigeTraite}
          className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
