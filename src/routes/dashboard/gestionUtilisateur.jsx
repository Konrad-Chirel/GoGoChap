import React, { useState } from 'react';
import { Search, MoreVertical, UserPlus, Edit2 as EditIcon, Trash2 as DeleteIcon, ChevronLeft, ChevronRight, User, LockKeyhole, LockKeyholeOpen  } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';






const initialUsers = [
  { id: 1, name: 'Arlene McCoy', role: 'Client', info: '24 Commandes', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', blocked: false },
  { id: 2, name: 'Leslie Alexander', role: 'Partenaire', info: "Daddy's Bar", avatar: 'https://randomuser.me/api/portraits/women/45.jpg',  blocked: false },
  { id: 3, name: 'Guy Hawkins', role: 'Livreur', info: '166 Livraisons', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' ,  blocked: false},
  { id: 4, name: 'Darlene Robertson', role: 'Livreur', info: '16 Livraisons', avatar: 'https://randomuser.me/api/portraits/women/47.jpg', blocked: false },
  { id: 5, name: 'Annette Black', role: 'Client', info: '15 Commandes', avatar: 'https://randomuser.me/api/portraits/women/48.jpg', blocked: false  },
  { id: 6, name: 'Ronald Richards', role: 'Partenaire', info: 'Tolaro Delices', avatar: 'https://randomuser.me/api/portraits/men/49.jpg', blocked: false  },
  { id: 7, name: 'Marvin McKinney', role: 'Client', info: '02 Commandes', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', blocked: false  },
];

const filters = ['Tous', 'Clients', 'Partenaires', 'Livreurs'];

const GestionUtilisateur = () => {
  const [usersData, setUsersData] = useState(initialUsers);
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Client',
    info: '',
    avatar: ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  

  const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditedUser(prev => ({ ...prev, [name]: value }));
};

const handleToggleBlock = (userId) => {
  let updatedUser = null;

  const updatedUsers = usersData.map(user => {
    if (user.id === userId) {
      updatedUser = { ...user, blocked: !user.blocked };
      return updatedUser;
    }
    return user;
  });

  setUsersData(updatedUsers);

  if (updatedUser) {
    const isBlocked = updatedUser.blocked;
    const action = isBlocked ? 'bloqué' : 'débloqué';
    const bgColor = isBlocked ? 'bg-red-500' : 'bg-green-500';
    const emoji = isBlocked ? '🚫' : '✅';
    const textColor = 'text-white';

    toast.custom(
      <div className={`px-4 py-2 rounded-md shadow-md ${bgColor} ${textColor} font-medium flex items-center gap-2`}>
        <span className="text-lg">{emoji}</span>
        Utilisateur {updatedUser.name} {action} !
      </div>
    );
  }
};







const handleSaveEdit = () => {
  setUsersData(prev =>
    prev.map(user => (user.id === editingUserId ? editedUser : user))
  );
  setEditingUserId(null);
  setEditedUser({});
};

  const handleAddUser = () => {
  if (!newUser.name.trim() || !newUser.role.trim() || !newUser.info.trim()) {
    alert("Tous les champs sont obligatoires (Nom, Rôle, Informations).");
    return;
  }
 


  const nextId = usersData.length + 1;
  const newUserWithId = {
    id: nextId,
    ...newUser
  };
  setUsersData([...usersData, newUserWithId]);
  setIsModalOpen(false);
  setNewUser({
    name: '',
    role: 'Client',
    info: '',
    avatar: ''
  });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filtrage et recherche
  const filteredAndSearchedUsers = usersData.filter(user => {
    const matchFilter = selectedFilter === 'Tous' || user.role.toLowerCase() === selectedFilter.toLowerCase().slice(0, -1);
    const matchSearch = user.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);

  // Obtenir les utilisateurs pour la page actuelle
  const paginatedUsers = filteredAndSearchedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  
  const handleDelete = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const updatedUsers = usersData.filter(user => user.id !== userId);
      setUsersData(updatedUsers);
      console.log('Utilisateur supprimé:', userId);
    }
   
  };

  return (
    <>
    <div className="bg-[#fff9f9] min-h-screen ml-6 overflow-x-hidden p-6 relative items-center justify-center">
      {/* Filtres et Bouton Ajouter */}
      <div className="flex flex-wrap flex-col md:flex-row gap-2 justify-between items-center mb-4">
        {/* Filtres */}
        <div className="flex gap-2 mb-4 md:mb-0 flex-wrap flex-grow justify-center sm:justify-start">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 sm:px-5 md:px-6 py-1 rounded-full text-xs sm:text-sm transition-all font-bold ${
                selectedFilter === filter ? 'bg-[#1238D8] text-white' : 'bg-gray-200 text-[#1238D8]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bouton Ajouter */}
       <div className='w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0'>
         <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1238D8] text-white px-6 py-1 rounded-full whitespace-nowrap hover:bg-blue-700 text-sm transition-colors"
        >
          Ajouter
        </button>
       </div>
      </div>

      {/* Modale d'ajout d'utilisateur */}
     {isModalOpen && (
  <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center px-4 transition-opacity duration-300">
    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Client">Client</option>
            <option value="Partenaire">Partenaire</option>
            <option value="Livreur">Livreur</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Informations</label>
          <input
            type="text"
            name="info"
            value={newUser.info}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 24 Commandes ou Nom du restaurant"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewUser(prev => ({ ...prev, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newUser.avatar && (
            <div className="mt-2">
              <img
                src={newUser.avatar}
                alt="Aperçu"
                className="w-full h-20 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleAddUser}
            className="px-4 py-2 bg-[#1238D8] text-white rounded-full hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Barre de Recherche */}
     
    
      <div className="flex items-center gap-1 mb-12">
  {/* Icône utilisateur */}
  <div className="p-1 items-center bg-white border border-gray-300 rounded-full shadow-sm">
  <Search className="text-gray-400 mr-2 rounded-full" size={20} />
  </div>

  {/* Barre de Recherche */}
  <div className="flex items-center  bg-white border border-gray-300 rounded-full px-4 py-1 w-[350px] shadow-sm relative z-10">
    
   <input
  type="text"
  placeholder="Rechercher un utilisateur"
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
  className="w-full outline-none pr-8 text-[#7F98CF] font-poppins font-light text-[14px] leading-none tracking-normal placeholder:text-[#D0D6E6]"
  style={{ fontWeight: 300 }}
/>

    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        className="absolute right-3 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    )}
  </div>
</div>

    
     


<div className="flex flex-col gap-4 ">
  {filteredAndSearchedUsers.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      Aucun résultat trouvé
    </div>
  ) : (
    <>
    <div className="overflow-x-auto w-full">
      <div className="min-w-[600px] flex flex-col gap-4">
       {paginatedUsers.map(user => (
  <div key={user.id} className="flex items-center">
    {/* Avatar */}
    <div className="flex-shrink-0">
      <img
        src={editingUserId === user.id ? editedUser.avatar : user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>

    {/* Contenu bordé */}
    <div className="flex items-center justify-between flex-1 border border-l-0 border-gray-300 pl-6 pr-6 py-3 ml-[-1px]">
      
      {/* Nom */}
      <div className="flex items-center w-[200px]">
        {editingUserId === user.id ? (
          <input
            name="name"
            value={editedUser.name}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <h4 className="font-medium text-[14px] leading-none tracking-normal font-poppins text-[#000000] ">
  {user.name}
</h4>

        )}
      </div>

      {/* Rôle */}
      <div className="flex items-center w-[120px]">
        {editingUserId === user.id ? (
          <select
            name="role"
            value={editedUser.role}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
          >
            <option value="Client">Client</option>
            <option value="Partenaire">Partenaire</option>
            <option value="Livreur">Livreur</option>
          </select>
        ) : (
          <span className="font-medium text-[14px] leading-none tracking-normal font-poppins text-[#CCCCCC] ">
  {user.role}
</span>

        )}
      </div>

      {/* Infos */}
      <div className="flex items-center flex-1">
        {editingUserId === user.id ? (
          <input
            name="info"
            value={editedUser.info}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <p className="font-medium text-[14px] leading-none tracking-normal font-poppins text-[#CCCCCC] ">
  {user.info}
</p>

        )}
      </div>

      {/* Actions */}
     <div className="relative flex items-center gap-2">
  <button
  onClick={() => handleToggleBlock(user.id)}
  title={user.blocked ? 'Débloquer' : 'Bloquer'}
  className={`p-2 rounded-full border ${
    user.blocked ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
  } hover:opacity-75 transition`}
>
  {user.blocked ? (
    <LockKeyholeOpen size={18} strokeWidth={2} />
  ) : (
    <LockKeyhole size={18} strokeWidth={2} />
  )}
</button>

</div>
    </div>
  </div>
))}
      </div>
</div>
      {/* Pagination inchangée */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronLeft size={20} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  )}
</div>
    </div>
    <Toaster position="top-right" />
     </>
  );
};

export default GestionUtilisateur;
