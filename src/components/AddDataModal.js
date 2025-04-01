import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function AddDataModal({ isOpen, onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    text: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsAnimatingOut(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:3004/api/clubhistorydata/creation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: formData.date,
            text: formData.text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success! Close the modal and reset form
      handleClose();
      setFormData({ title: "", link: "", team: "" });
      setSelectedTeam("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        isAnimatingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white rounded-lg p-8 w-10/12 lg:w-1/3 relative transition-all duration-300 ${
          isAnimatingOut
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl poppins-semibold mb-4">Add New Data</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm poppins-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm poppins-medium mb-1">
              Text <span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg h-24 px-3 py-2 focus:outline-none focus:border-black"
              placeholder="Enter text here"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs poppins-medium text-gray-500 hover:text-black rounded-lg lg:hover:bg-stone-100 transition-all duration-500 ease-in-out"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs poppins-medium bg-black text-white rounded-lg hover:bg-red-500 transition-all duration-500 ease-in-out disabled:bg-gray-400"
            >
              {isSubmitting ? "Adding..." : "Add Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
