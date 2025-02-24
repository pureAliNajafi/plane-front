"use client";
import { attributes } from "@/config/attributes";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Register all necessary components
Chart.register(...registerables);

const RadarChart = ({ attrs }: { attrs: any }) => {
  const [loading, setLoading] = useState(true);

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
    <div className="w-full h-full">
      {loading && (
        <span className={` w-full h-full flex items-center justify-center`}>
          <LoadingSpinner className="w-[40%] h-[40%]" />
        </span>
      )}
      <div
        className={loading ? "hidden" : "block"} // preventing layout shift
      >
        <Radar
          data={data}
          options={{
            scales: {
              r: {
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                  stepSize: 1, // Forces whole numbers
                  // callback: (value) => value.toString(), // Ensures no decimal formatting
                },
              },
            },
            animation: { onComplete: () => setLoading(false) },
          }}
        />
      </div>
    </div>
  );
};

export default RadarChart;
