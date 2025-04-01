import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function AddPersonModal({ isOpen, onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    role: "",
    team: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsAnimatingOut(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300); // Match this with animation duration
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("linkedin", formData.linkedin);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("team", selectedTeam);

      if (selectedImage) {
        formDataToSend.append("profilePicture", selectedImage);
      }

      const response = await fetch(
        "http://localhost:3004/api/people/creation/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success! Close the modal and reset form
      handleClose();
      setFormData({ name: "", linkedin: "", role: "", team: "" });
      setSelectedTeam("");
      setSelectedImage(null);
      setImagePreview(null);
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
        <h2 className="text-xl poppins-semibold mb-4">Add New Person</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm poppins-medium mb-1">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs text-center poppins-regular">
                    No image selected
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profilePhotoInput"
                />
                <label
                  htmlFor="profilePhotoInput"
                  className="px-4 py-2 text-xs poppins-medium bg-stone-100 text-black rounded-lg cursor-pointer hover:bg-stone-200 transition-all duration-500 ease-in-out inline-block text-center"
                >
                  Choose Photo
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 text-xs poppins-medium text-red-500 rounded-lg hover:bg-red-50 transition-all duration-500 ease-in-out"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm poppins-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm poppins-medium mb-1">
              LinkedIn <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              placeholder="https://linkedin.com/in/username"
              required
            />
          </div>

          <div>
            <label className="block text-sm poppins-medium mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm poppins-medium mb-1">
              Team <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className="w-full border text-sm poppins-regular border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black bg-white flex justify-between items-center"
            >
              <span className={selectedTeam ? "text-black" : "text-gray-500"}>
                {selectedTeam || "Select a team"}
              </span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-300 ${
                  isTeamDropdownOpen ? "rotate-180" : ""
                }`}
                size={12}
              />
            </button>

            {isTeamDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full max-h-32 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg animate-slideUp">
                {[
                  "Software Team",
                  "Electronics Team",
                  "Firmware Team",
                  "Mechanics Team",
                  "Executive Team",
                  "Director",
                  "Coordinator",
                ].map((team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsTeamDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm poppins-regular hover:bg-stone-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {team}
                  </button>
                ))}
              </div>
            )}
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
              {isSubmitting ? "Adding..." : "Add Person"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
