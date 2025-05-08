import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="bg-blue-200">
      <Navbar/>
      <Outlet/>
    </div>
  )
}
