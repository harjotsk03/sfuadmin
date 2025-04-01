import React, { useState } from "react";
import { FiEdit, FiTrash, FiSave } from "react-icons/fi";
import { FaChevronDown, FaTimes, FaCheck } from "react-icons/fa";

export default function ClubHistoryTimelineDataCard({ data, onUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    date: data.date,
    text: data.text,
  });

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
        `http://localhost:3004/api/clubhistorydata/editing/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-all duration-200 items-start text-sm">
      <div className="col-span-0.5">
        <input type="checkbox" className="rounded border-gray-300" />
      </div>

      <div className="col-span-2 flex items-center gap-3">
        {isEditing ? (
          <input
            type="text"
            name="date"
            value={editData.date}
            onChange={handleInputChange}
            className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
          />
        ) : (
          <span className="poppins-medium">{data.date}</span>
        )}
      </div>

      <div className="col-span-6 text-gray-600 poppins-regular">
        {isEditing ? (
          <textarea
            className="w-full h-24 border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
            type="text"
            name="text"
            value={editData.text}
            onChange={handleInputChange}
          />
        ) : (
          <span>{data.text}</span>
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
