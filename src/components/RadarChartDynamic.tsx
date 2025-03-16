import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const RadarChartDynamic = ({ data }: { data: any }) => {
  return (
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
        animation: {},
      }}
    />
  );
};

export default RadarChartDynamic;
