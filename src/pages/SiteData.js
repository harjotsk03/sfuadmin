import { useState } from "react";
import ClubHistoryTimelineData from "../components/ClubHistoryTimelineData";
import SponsorFormSubmissions from "../components/SponsorFormSubmissions";
import ContactFormSubmissions from "../components/ContactFormSubmissions";

export default function SiteData() {
  const [activeSection, setActiveSection] = useState("clubHistoryTimelineData");
  return (
    <div className="flex flex-col h-screen bg-gray-50/50 p-8">
      <h1 className="text-2xl poppins-semibold">Site Data</h1>
      <div className="flex flex-row gap-4 mt-4">
        <button
          onClick={() => setActiveSection("clubHistoryTimelineData")}
          className={`bg-black w-max h-max text-white px-4 py-2 rounded-lg poppins-medium text-xs hover:bg-red-500 transition-all duration-500 ease-in-out ${
            activeSection === "clubHistoryTimelineData" ? "bg-red-500" : ""
          }`}
        >
          Club History Timeline Data
        </button>
        <button
          onClick={() => setActiveSection("sponsorFormSubmissions")}
          className={`bg-black w-max h-max text-white px-4 py-2 rounded-lg poppins-medium text-xs hover:bg-red-500 transition-all duration-500 ease-in-out ${
            activeSection === "sponsorFormSubmissions" ? "bg-red-500" : ""
          }`}
        >
          Sponsor Form Submissions
        </button>
        <button
          onClick={() => setActiveSection("contactFormSubmissions")}
          className={`bg-black w-max h-max text-white px-4 py-2 rounded-lg poppins-medium text-xs hover:bg-red-500 transition-all duration-500 ease-in-out ${
            activeSection === "contactFormSubmissions" ? "bg-red-500" : ""
          }`}
        >
          Contact Form Submissions
        </button>
      </div>
      {activeSection === "clubHistoryTimelineData" && (
        <ClubHistoryTimelineData />
      )}
      {activeSection === "sponsorFormSubmissions" && <SponsorFormSubmissions />}
      {activeSection === "contactFormSubmissions" && <ContactFormSubmissions />}
    </div>
  );
}
