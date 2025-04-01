import React from "react";

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

export default function ContactFormSubmissionsCard({ data }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-all duration-200 items-start text-sm">
      <div className="col-span-0.5">
        <input type="checkbox" className="rounded border-gray-300" />
      </div>

      <div className="col-span-2 flex items-center gap-3">
        <span className="poppins-medium">{data.fullName}</span>
      </div>
      <div className="col-span-2">
        <span className="poppins-medium">{data.email}</span>
      </div>
      <div className="col-span-3">
        <span className="poppins-medium">{data.message}</span>
      </div>
      <div className="col-span-1">
        <span className="poppins-medium">{formatDate(data.createdAt)}</span>
      </div>
    </div>
  );
}
