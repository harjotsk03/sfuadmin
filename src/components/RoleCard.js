import React, { useState } from "react";
import { FiEdit, FiTrash, FiSave } from "react-icons/fi";
import { FaChevronDown, FaTimes, FaCheck } from "react-icons/fa";

const formatDate = (dateString) => {
  try {
    console.log("Original date string:", dateString);

    if (!dateString) return "No date";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export default function RoleCard({ role, onUpdate }) {
  console.log("Role:", role);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: role.title,
    link: role.link,
    team: role.team,
    isActive: role.isActive,
    datePosted: role.createdAt,
  });
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

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
        `http://localhost:3004/api/roles/editing/${role._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating role:", error);
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
    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-all duration-200 items-center text-sm z-40">
      <div className="col-span-0.5">
        <input type="checkbox" className="rounded border-gray-300" />
      </div>

      <div className="col-span-3 flex items-center gap-3">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="w-full border poppins-regular rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black"
          />
        ) : (
          <span className="poppins-medium">{role.title}</span>
        )}
      </div>

      <div className="col-span-3 text-gray-600 poppins-regular">
        {isEditing ? (
          <input
            type="text"
            name="team"
            value={editData.team}
            onChange={handleInputChange}
            className="w-full border poppins-regular rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black"
          />
        ) : (
          <span>{role.team}</span>
        )}
      </div>

      <div className="col-span-1 relative">
        {isEditing ? (
          <input
            type="text"
            name="link"
            value={editData.link}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-black"
          />
        ) : (
          <button
            onClick={() => window.open(role.link, "_blank")}
            className="bg-black text-white px-2 py-1 rounded-lg text-xs hover:bg-red-500 transition-all duration-500 ease-in-out"
          >
            View Form
          </button>
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
              {editData.isActive ? "Open" : "Closed"}
              <FaChevronDown size={12} />
            </button>
            {isStatusDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                {["Open", "Closed"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setEditData((prev) => ({
                        ...prev,
                        isActive: option === "Open",
                      }));
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm poppins-regular hover:bg-stone-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
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
              role.isActive
                ? "text-green-500 bg-green-500/10"
                : "text-red-500 bg-red-500/10"
            }`}
          >
            {role.isActive ? "Open" : "Closed"}
          </span>
        )}
      </div>

      <div className="col-span-2 relative">
        <span>{formatDate(role.createdAt)}</span>
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
