import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
