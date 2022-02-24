// import React from "react";
// import {
//   AreaChart,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 40,
//     pv: 24,
//     amt: 24,
//   },
//   {
//     name: "Page B",
//     uv: 30,
//     pv: 13,
//     amt: 22,
//   },
//   {
//     name: "Page C",
//     uv: 20,
//     pv: 80,
//     amt: 22,
//   },
//   {
//     name: "Page D",
//     uv: 27,
//     pv: 39,
//     amt: 20,
//   },
//   {
//     name: "Page E",
//     uv: 18,
//     pv: 48,
//     amt: 21,
//   },
//   {
//     name: "Page F",
//     uv: 23,
//     pv: 38,
//     amt: 25,
//   },
//   {
//     name: "Page G",
//     uv: 34,
//     pv: 43,
//     amt: 21,
//   },
//   {
//     name: "Page H",
//     uv: 60,
//     pv: 70,
//     amt: 22,
//   },
//   {
//     name: "Page I",
//     uv: 75,
//     pv: 98,
//     amt: 22,
//   },
// ];

// export default function SalesLineGraph() {
//   return (
//     <ResponsiveContainer style={{ backgroundColor: "black" }}>
//       <AreaChart
//         width={730}
//         height={250}
//         data={data}
//         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//       >
//         <defs>
//           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#BDA4FE" stopOpacity={0.4} />
//             <stop offset="95%" stopColor="#BDA4FE" stopOpacity={0} />
//           </linearGradient>
//           <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#72E6D8" stopOpacity={0.4} />
//             <stop offset="95%" stopColor="#72E6D8" stopOpacity={0} />
//           </linearGradient>
//         </defs>

//         <YAxis unit="k" />
//         <CartesianGrid strokeDasharray="3 3" />
//         <Tooltip />
//         <Area
//           dataKey="uv"
//           stroke="#8884d8"
//           fillOpacity={1}
//           strokeWidth={2}
//           activeDot={{ r: 8 }}
//           dot={{ r: 3 }}
//           fill="url(#colorUv)"
//         />
//         <Area
//           dataKey="pv"
//           stroke="#82ca9d"
//           fillOpacity={1}
//           strokeWidth={2}
//           activeDot={{ r: 8 }}
//           dot={{ r: 3 }}
//           fill="url(#colorPv)"
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// }
