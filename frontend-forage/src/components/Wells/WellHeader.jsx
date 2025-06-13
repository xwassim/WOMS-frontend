import { Outlet, } from "react-router-dom";
import { Card, CardContent } from "../ui/Card"; // Optional component for well-specific header
import { useParams } from "react-router-dom";
import data from "../../data/data"; // Import your data.js
import { FiArrowLeft } from 'react-icons/fi';
import { FaLocationDot } from "react-icons/fa6";

export default function WellHeader() {
  const { wellId } = useParams();

  // Find the well in your data
  const well = data.drillWells.find((well) => well.id === Number(wellId));

  if (!well) {
    return <div className="well-header-error">Well not found</div>;
  }

  return (
    <div className=" ">
    <Card className="flex items-center gap-[14.09px] px-[15px] py-[10.57px] bg-white rounded-[15px] border border-solid border-[#e1e1e1] w-full  mx-auto ">
      <CardContent className="flex items-center gap-[14.09px] p-0 w-full">
   
        <div className="relative w-[42.27px] h-[42.27px] bg-[#1652df1a] rounded-[36.99px] overflow-hidden flex-shrink-0">
          {/* <img
            className="absolute w-3.5 h-[18px] top-3 left-3.5"
            alt="Location marker"
            src="/default-marker-component.svg"
          /> */}
          <FaLocationDot className="absolute w-3.5 h-[18px] top-3 left-3.5 text-[#1652df]" />
        </div>

        <div className="flex flex-col items-start gap-[5.28px]">
          <h2 className="w-fit mt-[-0.88px] font-['Inter',Helvetica] font-medium text-[#0f126b] text-lg text-[15.9px] tracking-[0] leading-normal whitespace-nowrap">
            {well.name}
          </h2>

          <div className="flex items-center gap-[1.76px]">
            <p className="w-fit mt-[-0.88px] font-['Inter',Helvetica] font-medium text-[#626365] text-sm tracking-[0] leading-normal">
              Site : {well.siteName} - {well.location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
