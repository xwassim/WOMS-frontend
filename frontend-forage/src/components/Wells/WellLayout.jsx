// components/WellLayout.jsx
import { Outlet } from "react-router-dom";
import WellHeader from "./WellHeader";

export default function WellLayout() {
  return (

    <div className="well-container bg-gray-100 ">
      
      <WellHeader />
      <div className="well-content pt-5 ">
        <Outlet />
      </div>
    </div>
  );
}