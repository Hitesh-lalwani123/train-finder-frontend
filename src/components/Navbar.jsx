// src/components/Navbar.js
import { FaTrain, FaBus, FaUserCircle, FaQuestionCircle, FaClipboardList } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <div className="flex space-x-6 items-center text-sm font-semibold">
        <div className="flex items-center space-x-1 border-green-600 text-green-600 text-xl">
          <FaTrain /><span>Train Route Finder</span>
        </div>
      </div>
      <div className="flex space-x-4 text-gray-600 text-sm items-center">
        <div className="flex items-center gap-1"><FaClipboardList /> Bookings</div>
        <div className="flex items-center gap-1"><FaQuestionCircle /> Help</div>
        <div className="flex items-center gap-1"><FaUserCircle /> Account</div>
      </div>
    </div>
  );
}
