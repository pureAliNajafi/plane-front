"use client";
import { attributes } from "@/config/attributes";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Register all necessary components
Chart.register(...registerables);

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
    <div className="w-full h-full relative flex items-center justify-center">
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
          animation: {
            easing: "easeInSine",
            // onComplete: () => setLoading(false),
            // onProgress: (event) => {
            //   const loadPercent = (event.currentStep / event.numSteps) * 100;
            //   console.log((event.currentStep / event.numSteps) * 100);
            // },
          },
        }}
      />
    </div>
  );
};

export default RadarChart;
