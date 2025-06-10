import React from "react";
import CARD_1 from "../../assets/images/card1.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl shadow-lg flex items-center gap-5 w-80 z-30 
                 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
    >
      <div
        className={`w-14 h-14 flex items-center justify-center text-white ${color} rounded-full drop-shadow-xl text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm tracking-wide">{label}</p>
        <h4 className="text-2xl font-semibold text-gray-900">{value}</h4>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col md:flex-row relative font-sans overflow-hidden">
      
      {/* App Title */}
      <div className="absolute top-6 left-8 z-20">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
          Expense Tracker
        </h2>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 z-10 mt-24 md:mt-0">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-[40vw] h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 relative rounded-l-[3rem] overflow-hidden flex-col items-center justify-center gap-8">
        
        {/* Blue Blurred Background Shape */}
        <div className="absolute w-60 h-60 rounded-[40px] bg-gradient-to-br from-blue-600 to-blue-800 top-8 left-8 z-0 shadow-lg opacity-90 blur-[1px]" />
        
        {/* Stats Card */}
        <div className="z-10">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="$430.00"
            color="bg-blue-700"
          />
        </div>
        
        {/* Motivational Text */}
        <div className="z-10">
          <p className="text-blue-900 font-medium text-lg leading-snug italic text-center">
            “Small savings today lead to big dreams tomorrow.”
          </p>
        </div>
        
        {/* Decorative Image */}
        <div className="w-64 h-80 rounded-[40px] border-8 border-blue-800 z-10 overflow-hidden shadow-xl">
          <img
            src={CARD_1}
            alt="Decorative card"
            className="w-full h-full object-contain object-center rounded-[32px] bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
