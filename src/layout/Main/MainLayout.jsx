import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Outlet/>
    </div>
  )
}
