import React, { useState } from "react";
import { FiEdit, FiTrash, FiSave } from "react-icons/fi";
import { FaChevronDown, FaTimes, FaCheck } from "react-icons/fa";

export default function PersonCard({ person, onUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: person.name,
    linkedin: person.linkedin,
    role: person.role,
    team: person.team,
    isActive: person.isActive,
    isAlumni: person.isAlumni,
  });
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isAlumniDropdownOpen, setIsAlumniDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/people/editing/${person._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update person");
      }

      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const teams = [
    "Software Team",
    "Electronics Team",
    "Firmware Team",
    "Mechanics Team",
    "Executive Team",
    "Director",
    "Coordinator",
  ];

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-all duration-200 items-center text-sm">
      <div className="col-span-0.5">
        <input type="checkbox" className="rounded border-gray-300" />
      </div>

      <div className="col-span-3 flex items-center gap-3">
        <img
          src={person.profilePicture}
          alt={person.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black"
          />
        ) : (
          <span className="poppins-medium">{person.name}</span>
        )}
      </div>

      <div className="col-span-3 text-gray-600 poppins-regular">
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={editData.role}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black"
          />
        ) : (
          <span>{person.role}</span>
        )}
      </div>

      <div className="col-span-2 relative">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black flex justify-between items-center"
            >
              {editData.team}
              <FaChevronDown size={12} />
            </button>
            {isTeamDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                {teams.map((team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => {
                      setEditData((prev) => ({ ...prev, team }));
                      setIsTeamDropdownOpen(false);
                    }}
                    className="w-full px-2 py-1 text-left text-sm hover:bg-gray-50"
                  >
                    {team}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="text-gray-600 poppins-regular">{person.team}</span>
        )}
      </div>

      <div className="col-span-1 relative">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black flex justify-between items-center"
            >
              {editData.isActive ? "Yes" : "No"}
              <FaChevronDown size={12} />
            </button>
            {isStatusDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setEditData((prev) => ({
                        ...prev,
                        isActive: option === "Yes",
                      }));
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full px-2 py-1 text-left text-sm hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span
            className={`text-gray-600 poppins-regular px-2 py-1 rounded-lg ${
              person.isActive
                ? "text-green-500 bg-green-500/10"
                : "text-red-500 bg-red-500/10"
            }`}
          >
            {person.isActive ? "Yes" : "No"}
          </span>
        )}
      </div>

      <div className="col-span-1 relative">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsAlumniDropdownOpen(!isAlumniDropdownOpen)}
              className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black flex justify-between items-center"
            >
              {editData.isAlumni ? "Yes" : "No"}
              <FaChevronDown size={12} />
            </button>
            {isAlumniDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setEditData((prev) => ({
                        ...prev,
                        isAlumni: option === "Yes",
                      }));
                      setIsAlumniDropdownOpen(false);
                    }}
                    className="w-full px-2 py-1 text-left text-sm hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span
            className={`text-gray-600 poppins-regular px-2 py-1 rounded-lg ${
              person.isAlumni
                ? "text-green-500 bg-green-500/10"
                : "text-red-500 bg-red-500/10"
            }`}
          >
            {person.isAlumni ? "Yes" : "No"}
          </span>
        )}
      </div>

      <div className="col-span-1 flex gap-2">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-xs px-2 py-2 bg-green-500/20 text-green-500 rounded hover:bg-green-500/30 transition-colors"
            >
              <FaCheck size={12} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs px-2 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs px-2 py-2 bg-black/10 text-black rounded hover:bg-black/20 transition-colors"
            >
              <FiEdit size={12} />
            </button>
            <button
              //   onClick={() => setIsDeleting(true)}
              className="text-xs px-2 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
            >
              <FiTrash size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
