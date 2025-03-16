"use client";
import { attributes } from "@/config/attributes";
import LoadingSpinner from "./LoadingSpinner";
import dynamic from "next/dynamic";

// Register all necessary components
const RadarChartDynamic = dynamic(() => import("@/components/RadarChartDynamic"), {
  ssr: false,
  loading: () => <LoadingSpinner className="my-5 w-2/3" />,
});
const RadarChart = ({ attrs }: { attrs: any }) => {
  const data = {
    labels: attributes,
    datasets: [
      {
        label: "Attributes",
        data: [attrs.Attack, attrs.Defence, attrs.Speed, attrs.Agility, attrs.Capacity],
        backgroundColor: "rgba(99, 200, 132 , 0.2)",
        borderColor: "rgba(99, 200, 132 , 1)",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="w-full h-full relative flex items-center justify-center min-h-[345px] md:min-h-0">
      <RadarChartDynamic data={data} />
    </div>
  );
};

export default RadarChart;
