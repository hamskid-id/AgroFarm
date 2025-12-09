"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Custom plugin to add shadow to datalabels
const shadowPlugin = {
  id: "shadowPlugin",
  beforeDatasetsDraw: (chart: any) => {
    const ctx = chart.ctx;
    ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
  },
  afterDatasetsDraw: (chart: any) => {
    const ctx = chart.ctx;
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },
};

// Custom plugin to draw perfect circle labels
const perfectCirclePlugin = {
  id: "perfectCirclePlugin",
  afterDatasetsDraw: (chart: any) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);
    const total = chart.data.datasets[0].data.reduce(
      (a: number, b: number) => a + b,
      0,
    );

    // Don't draw circles if total is 0 (prevents NaN)
    if (total === 0) return;

    meta.data.forEach((arc: any, index: number) => {
      const value = chart.data.datasets[0].data[index];
      const percentage = Math.round((value / total) * 100);

      // Skip drawing if percentage is 0 or NaN
      if (!percentage || isNaN(percentage)) return;

      // Calculate position
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = arc.outerRadius;
      const offset = -10;

      const x = arc.x + Math.cos(angle) * (radius + offset);
      const y = arc.y + Math.sin(angle) * (radius + offset);

      // Circle dimensions
      const circleSize = 70; // width and height for perfect circle
      const circleRadius = circleSize / 2;

      // Draw circle with shadow
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw text
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "#000";
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${percentage}%`, x, y);

      ctx.restore();
    });
  },
};

ChartJS.register(shadowPlugin, perfectCirclePlugin);

interface DoughnutChartProps {
  data: number[];
  labels: string[];
  colors: string[];
  cutout?: string;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  labels,
  colors,
  cutout = "55%",
}) => {
  // Check if all data is zero or empty
  const hasData = data.some((value) => value > 0);

  const chartData = {
    labels: hasData ? labels : ["No Data"],
    datasets: [
      {
        data: hasData ? data : [1], // Show a single segment when no data
        backgroundColor: hasData ? colors : ["#E5E7EB"], // Gray color for empty state
        borderWidth: 0,
        borderColor: hasData ? "white" : "#D1D5DB", // Light gray border
        cutout: cutout,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: hasData, // Disable tooltip when no data
      },
      datalabels: {
        display: false, // Hide default labels, using custom plugin instead
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={chartData} options={options} />
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-gray-400 text-sm font-medium">No Data</span>
        </div>
      )}
    </div>
  );
};
