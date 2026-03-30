import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [flow, setFlow] = useState(false);
  const [flowRate, setFlowRate] = useState(0);
  const [waterLevel, setWaterLevel] = useState(65);
  const [temperature, setTemperature] = useState(22.5);
  const [pressure, setPressure] = useState(2.8);

  // simulate data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setFlow((prev) => !prev);
      setFlowRate((prev) => (!flow ? 12.45 + Math.random() * 2 : 0));
      setWaterLevel((prev) => {
        if (flow) {
          return Math.min(95, prev + Math.random() * 3);
        } else {
          return Math.max(25, prev - Math.random() * 1.5);
        }
      });
      setTemperature((prev) => 20 + Math.random() * 8);
      setPressure((prev) => 2 + Math.random() * 2);
    }, 2000);

    return () => clearInterval(interval);
  }, [flow]);

  const getWaterLevelColor = (level) => {
    if (level > 75) return "from-blue-500 to-blue-400";
    if (level > 40) return "from-blue-400 to-blue-300";
    return "from-blue-300 to-blue-200";
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Flow Meter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Flow Rate
            </h3>
            <motion.div
              animate={{
                rotate: flow ? 360 : 0,
              }}
              transition={{
                duration: 2,
                repeat: flow ? Infinity : 0,
                ease: "linear",
              }}
            >
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.div>
          </div>
          <motion.p
            className="text-3xl font-bold text-gray-800"
            animate={{
              scale: flow ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: flow ? Infinity : 0,
            }}
          >
            {flow ? flowRate.toFixed(2) : "0.00"}
            <span className="text-lg text-gray-400 ml-1">L/s</span>
          </motion.p>
          <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: flow ? `${(flowRate / 15) * 100}%` : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Temperature Gauge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Temperature
            </h3>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-5 h-5 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v2m0 4v2m4-4h-2M8 9H6m12 0h-2m-2 4h-2m-2 0H8m8 0h-2"
                />
              </svg>
            </motion.div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {temperature.toFixed(1)}°C
          </p>
          <div className="mt-4 flex justify-between text-xs text-gray-400">
            <span>Optimal: 18-26°C</span>
          </div>
        </motion.div>

        {/* Pressure Gauge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Pressure
            </h3>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {pressure.toFixed(1)}
            <span className="text-lg text-gray-400 ml-1">bar</span>
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                pressure > 3.5 ? "bg-red-500" : pressure > 2.5 ? "bg-green-500" : "bg-yellow-500"
              } animate-pulse`}
            />
            <span className="text-xs text-gray-500">
              {pressure > 3.5
                ? "High Pressure"
                : pressure > 2.5
                ? "Normal"
                : "Low Pressure"}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-8">
        {/* Main Layout: Tank on Left, Components on Right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Main Tank */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              {/* Main Tank */}
              <div className="relative w-80 h-[20rem] bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {/* Water Level */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterLevelColor(
                    waterLevel
                  )} transition-all duration-700 ease-out`}
                  style={{ height: `${waterLevel}%` }}
                  animate={{
                    boxShadow: flow
                      ? [
                          "0 0 0px rgba(59,130,246,0)",
                          "0 0 20px rgba(59,130,246,0.3)",
                          "0 0 0px rgba(59,130,246,0)",
                        ]
                      : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: flow ? Infinity : 0,
                  }}
                >
                  {/* Water Ripple Effect */}
                  {flow && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-6 bg-white/30"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Tank Markings */}
                <div className="absolute inset-0 flex flex-col justify-between py-6 px-3">
                  {[25, 50, 75].map((mark) => (
                    <div key={mark} className="relative">
                      <div className="absolute right-0 w-4 h-px bg-gray-300" />
                      <span className="absolute right-2 text-xs text-gray-400">
                        {mark}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tank Label */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-medium text-gray-600">ESR-1000</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Simplified Components */}
          <div className="lg:w-1/2 space-y-5">
            {/* Pipes Section - Simplified */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 justify-between">
                {/* Inlet */}
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                    <AnimatePresence>
                      {flow && (
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          exit={{ x: "100%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                          }}
                          style={{ width: "35%" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${flow ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-500">INLET</span>
                  </div>
                </div>

                {/* Valve */}
                <div className="relative">
                  <motion.div
                    className="w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      rotate: flow ? 90 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  </motion.div>
                </div>

                {/* Outlet */}
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                    <AnimatePresence>
                      {flow && (
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          exit={{ x: "100%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                          }}
                          style={{ width: "35%" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-xs text-gray-500">OUTLET</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${flow ? "bg-blue-500" : "bg-gray-300"}`} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Indicator - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${flow ? "bg-green-500" : "bg-red-400"}`}
                    animate={{
                      scale: flow ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: flow ? Infinity : 0,
                    }}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">System Status</h3>
                    <span className="text-xs text-gray-500">
                      {flow ? "Active Flow" : "Standby Mode"}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{
                    rotate: flow ? 360 : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: flow ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Water Level Indicator - Simple Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Water Level</span>
                <span className="text-sm font-semibold text-blue-600">
                  {waterLevel.toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${waterLevel}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;