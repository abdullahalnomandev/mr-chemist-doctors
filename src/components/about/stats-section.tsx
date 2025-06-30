import React from "react";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export const StatsSection: React.FC = () => {
  const stats = [
    { value: "2000", label: "Monthly Active Users" },
    { value: "$5 Million", label: "Revenue Generated" },
    { value: "99.9%", label: "Uptime Percentage" },
    { value: "15%", label: "Market Share" },
  ];

  return (
    <section className="bg-secondary py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};