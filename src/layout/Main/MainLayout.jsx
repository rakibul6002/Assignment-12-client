import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <Navbar/>
      <Outlet/>
    </div>
  )
}
