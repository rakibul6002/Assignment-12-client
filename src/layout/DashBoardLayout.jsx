import { Outlet } from "react-router-dom";
import DashNavbar from "../pages/Dashboard/DashNavbar";
import Sidebar from "../pages/Dashboard/Sidebar";

export default function DashBoardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className=" hidden md:block w-64 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashNavbar />

        {/* Outlet content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
