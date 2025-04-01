import { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SponsorFormSubmissionsCard from "./ContactFormSubmissionsCard";
import AddDataModal from "./AddDataModal";
export default function SponsorFormSubmissions() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3004/api/sponsorformsubmissions/retreival/"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 justify-between items-center py-4">
        <h1 className="text-xl poppins-semibold">Sponsor Form Submissions</h1>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-2">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch size={14} />
          </div>
          <input
            type="text"
            className="w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors duration-300"
            placeholder="Search data..."
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
              <div className="col-span-2 flex items-center gap-1">
                Full Name
              </div>
              <div className="col-span-2">Company/Organization</div>
              <div className="col-span-1">Job Title</div>
              <div className="col-span-1">Email</div>
              <div className="col-span-2">Package Level</div>
              <div className="col-span-2">Message</div>
              <div className="col-span-1">Date</div>
            </div>
            {/* People list */}
            <div className="mt-2 z-40 pb-20">
              {[...data].reverse().map((data) => (
                <SponsorFormSubmissionsCard
                  key={data._id}
                  data={data}
                  onUpdate={fetchData}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {data.length > 0
                ? "1-" + data.length + " of " + data.length
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

      <AddDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
