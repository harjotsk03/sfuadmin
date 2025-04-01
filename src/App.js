import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import People from "./pages/People";
import OpenRoles from "./pages/OpenRoles";
import SiteData from "./pages/SiteData";

const App = () => {
  return (
    <Router>
      <div className="flex flex-row w-screen h-screen">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/people" element={<People />} />
            <Route path="/open-roles" element={<OpenRoles />} />
            <Route path="/site-data" element={<SiteData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
