import { PiUserCirclePlusFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import AddPersonModal from "../components/AddPersonModal";
import PersonCard from "../components/PersonCard";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
export default function People() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const peoplePerPage = 5;

  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/people/retreival/`
      );
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const filtered = people.filter(
      (person) =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.team.toLowerCase().includes(search.toLowerCase()) ||
        person.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPeople(filtered);
  }, [search, people]);

  // Calculate pagination values
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = filteredPeople.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );
  const totalPages = Math.ceil(filteredPeople.length / peoplePerPage);

  return (
    <div className="flex flex-col h-screen bg-gray-50/50 p-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl poppins-semibold">People</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg poppins-medium text-xs hover:bg-red-500 transition-all duration-500 ease-in-out"
        >
          Add Person
        </button>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-10">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch size={14} />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors duration-300"
            placeholder="Search user..."
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
              <div className="col-span-3 flex items-center gap-1">Name</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-2">Team</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Alumni</div>
              <div className="col-span-1"></div>
            </div>
            {/* People list */}
            <div className="mt-2 z-40 pb-20">
              {currentPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onUpdate={fetchPeople}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {filteredPeople.length > 0
                ? `${indexOfFirstPerson + 1}-${Math.min(
                    indexOfLastPerson,
                    filteredPeople.length
                  )} of ${filteredPeople.length}`
                : "0"}
            </span>
            <div className="flex gap-1">
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft size={14} />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddPersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
