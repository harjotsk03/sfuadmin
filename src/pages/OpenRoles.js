import { PiUserCirclePlusFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import AddRoleModal from "../components/AddRoleModal";
import RoleCard from "../components/RoleCard";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";

export default function OpenRoles() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/roles/retreival/`
      );
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50/50 p-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl poppins-semibold">Open Roles</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg poppins-medium text-xs hover:bg-red-500 transition-all duration-500 ease-in-out"
        >
          Add Role
        </button>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-10">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch size={14} />
          </div>
          <input
            type="text"
            className="w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors duration-300"
            placeholder="Search role..."
          />
        </div>

        {/* Add an outer div for horizontal scrolling */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {" "}
            {/* Set minimum width to prevent squishing */}
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-500">
              <div className="col-span-0.5">
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
              <div className="col-span-3 flex items-center gap-1">Title</div>
              <div className="col-span-3">Team</div>
              <div className="col-span-1">Link</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Date Posted</div>
              <div className="col-span-1"></div>
            </div>
            {/* People list */}
            <div className="mt-2 z-40 pb-20">
              {roles.map((role) => (
                <RoleCard key={role._id} role={role} onUpdate={fetchRoles} />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {roles.length > 0
                ? "1-" + roles.length + " of " + roles.length
                : "0"}
            </span>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-100">
                <FiChevronLeft size={14} />
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
