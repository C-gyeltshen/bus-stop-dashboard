"use client";

import ThimphuBusSchedule from "../thimphu/page";
import PhuntsholingBusSchedule from "../timing/page";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Bus,
  Clock,
  MapPin,
  CreditCard,
  Route,
  Wifi,
  Globe,
} from "lucide-react";

const BusMap = dynamic(() => import("../../components/BusMap"), { ssr: false });

const BhuBusDashboard = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardBalance, setCardBalance] = useState("");
  const [mounted, setMounted] = useState(false);
  type BalanceResult = {
    balance?: string;
    cardNumber?: string;
    lastUsed?: string;
    cardType?: string;
    error?: string;
  };
  const [balanceResult, setBalanceResult] = useState<BalanceResult | null>(
    null
  );
  // Use 'FromThimphu' and 'ToThimphu' to match the button logic and conditional rendering
  const [selectedDirection, setSelectedDirection] = useState("FromThimphu");
  const busRoutes = [
    {
      id: "T1",
      name: "Thimphu",
      color: "bg-orange-500",
    },
    {
      id: "P2",
      name: "Phuentsholing",
      color: "bg-blue-500",
    },
  ];
  const [selectedRoute, setSelectedRoute] = useState<null | (typeof busRoutes)[0]>(null);
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "dz" : "en");
  };

  const text: {
    [key: string]: {
      appName: string;
      appSubtitle: string;
      location: string;
      connected: string;
      time: string;
      tabs: { timing: string; routes: string; live: string; balance: string };
      timing: {
        header: string;
        subtitle: string;
        fromThimphu: string;
        toThimphu: string;
        next: string;
        following: string;
        bus: string;
        driver: string;
        statusOnTime: string;
        statusDelayed: string;
        statusEarly: string;
        status: string;
      };
      routes: {
        operatingHours: string;
        frequency: string;
        totalStops: string;
        viewFullRoute: string;
      };
      live: { header: string; passengers: string; away: string };
      balance: {
        header: string;
        subtitle: string;
        cardNumber: string;
        placeholder: string;
        checkBalance: string;
        error: string;
        errorMessage: string;
        cardBalance: string;
        lastUsed: string;
        quickTopUp: string;
      };
      langSwitch: string;
    };
  } = {
    en: {
      appName:"Khorlam Palri",
      appSubtitle: "Bhutan Transport",
      location: "Phuentsholing Central",
      connected: "Connected",
      time: "Time",
      tabs: {
        timing: "Bus Timings",
        routes: "Bus Routes",
        live: "Live Location",
        balance: "Card Balance",
      },
      timing: {
        header: "Today's Schedule",
        subtitle: "Live bus arrivals and departures",
        fromThimphu: "Thimphu",
        toThimphu: "Phuntsholing",
        next: "Next",
        following: "Following",
        bus: "Bus",
        driver: "Driver",
        statusOnTime: "On Time",
        statusDelayed: "Delayed",
        statusEarly: "Early",
        status: "Status",
      },
      routes: {
        operatingHours: "Operating Hours",
        frequency: "Frequency",
        totalStops: "Total Stops",
        viewFullRoute: "View Full Route",
      },
      live: {
        header: "Buses En Route",
        passengers: "Passengers",
        away: "away",
      },
      balance: {
        header: "Check Your Card Balance",
        subtitle: "Druk Card",
        cardNumber: "Card Number",
        placeholder: "Enter your card number",
        checkBalance: "Check Balance",
        error: "Error",
        errorMessage: "Please enter a valid card number.",
        cardBalance: "Card Balance",
        lastUsed: "Last used",
        quickTopUp: "Quick Top-up",
      },
      langSwitch: "Dzongkha",
    },
    dz: {
      appName: "འབྲུག་འགྲུལ་འཁོར།",
      appSubtitle: "འབྲུག་གི་འགྲུལ་འཁོར།",
      location: "ཕུན་ཚོགས་གླིང་སི་མ།",
      connected: "སྦྲེལ་བ་ཡོད།",
      time: "དུས་ཚོད།",
      tabs: {
        timing: "འགྲུལ་འཁོར་དུས་ཚོད།",
        routes: "འགྲུལ་ལམ།",
        live: "གནས་ས་སྐབས་རེའི།",
        balance: "ཀར་ཌི་དངུལ་རྩིས།",
      },
      timing: {
        header: "རིང་གི་འགྲུལ་འཁོར་རེའུ་མིག",
        subtitle: "འགྲུལ་འཁོར་ཡོང་ནི་དང་འགྱོ་ནི་གནས་ཚུལ།",
        fromThimphu: "ཐིམ་ཕུ་ནས།",
        toThimphu: "ཐིམ་ཕུ་ལ།",
        next: "རྗེས་མ།",
        following: "ཕྱི་མ།",
        bus: "འགྲུལ་འཁོར།",
        driver: "འཁོར་སྐྱོདཔ་",
        statusOnTime: "ལུས་མེད།",
        statusDelayed: "ཕྱི་ལོག",
        statusEarly: "སྔ་པོ།",
        status: "གནས་སྟངས།",
      },
      routes: {
        operatingHours: "སྐར་མའི་དུས་ཚོད།",
        frequency: "འགྲུལ་འཁོར་ཚད།",
        totalStops: "འདུག་ས།",
        viewFullRoute: "འགྲུལ་ལམ་ལྟ་བ།",
      },
      live: {
        header: "སྐབས་རེའི་འགྲུལ་འཁོར།",
        passengers: "ཞུགས་པ།",
        away: "ལེ་དབར།",
      },
      balance: {
        header: "ཀར་ཌི་དངུལ་རྩིས་ལྟ་བ།",
        subtitle: "འབྲུག་ཀར་ཌི།",
        cardNumber: "ཀར་ཌི་ཨང་གྲངས།",
        placeholder: "ཀར་ཌི་ཨང་གྲངས་བཙུགས་ནི།",
        checkBalance: "དངུལ་རྩིས་ལྟ་བ།",
        error: "གནད་དོན་ཞིག་འདུག",
        errorMessage: "དྲང་པོའི་ཀར་ཌི་ཨང་གྲངས་བཙུགས་རོགས།",
        cardBalance: "ཀར་ཌི་དངུལ་རྩིས།",
        lastUsed: "མཇུག་བསྡུ་ནི།",
        quickTopUp: "མྱུར་དུ་སྐྱེལ་བ།",
      },
      langSwitch: "English",
    },
  };

  const t = text[language];

  // Mock bus data for map
  const liveBuses = [
    {
      id: "BHU-001",
      route: "T1",
      location: "Approaching Simtokha",
      distance: "2.3 km",
      passengers: 38,
      driver: "Pema Tshering",
      lat: 27.4728,
      lng: 89.6391,
      eta: 5,
    },
    {
      id: "BHU-102",
      route: "P2",
      location: "Near Chuzom Bridge",
      distance: "5.1 km",
      passengers: 24,
      driver: "Karma Dorji",
      lat: 27.483,
      lng: 89.65,
      eta: 12,
    },
    {
      id: "BHU-203",
      route: "W3",
      location: "Dochula Pass",
      distance: "8.7 km",
      passengers: 45,
      driver: "Tashi Wangchuk",
      lat: 27.491,
      lng: 89.67,
      eta: 18,
    },
    {
      id: "BHU-304",
      route: "B4",
      location: "Wangdue Town",
      distance: "12.4 km",
      passengers: 52,
      driver: "Sonam Gyeltshen",
      lat: 27.5,
      lng: 89.69,
      eta: 28,
    },
  ];

  useEffect(() => {
    setMounted(true); 
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkBalance = () => {
    if (cardBalance.length >= 8) {
      const mockBalance = Math.floor(Math.random() * 500) + 50;
      setBalanceResult({
        balance: mockBalance.toFixed(2),
        cardNumber: cardBalance,
        lastUsed: "Today, 2:30 PM",
        cardType: "Druk Card",
        error: undefined,
      });
    } else {
      setBalanceResult({ error: t.balance.errorMessage });
    }
  };

  const sidebarItems = [
    { id: "live", label: t.tabs.live, icon: MapPin },
    { id: "timing", label: t.tabs.timing, icon: Clock },
    { id: "balance", label: t.tabs.balance, icon: CreditCard },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <div className="md:w-64 bg-slate-900 shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className="p-4 md:p-6 relative z-10 border-b border-slate-700 flex justify-between items-center md:flex-col md:items-start">
          <div className="flex items-center space-x-4">
            <div className="p-2 md:p-3 bg-red-600 rounded-full shadow-lg">
              <Bus className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {t.appName}
              </h1>
              <p className="text-gray-400 text-sm">{t.appSubtitle}</p>
            </div>
          </div>
          {/* language switch */}
          <button
            onClick={toggleLanguage}
            className="md:mt-4 p-2 md:p-1 text-xs rounded-lg text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center space-x-1"
          >
            <Globe className="w-4 h-4" />
            <span>{t.langSwitch}</span>
          </button>
        </div>

        <nav className="flex md:flex-col justify-around md:justify-start overflow-x-auto mt-0 md:mt-8 relative z-10 border-b md:border-b-0 border-gray-700 bg-slate-800 md:bg-transparent">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 md:flex-none flex items-center space-x-2 md:space-x-4 px-2 md:px-6 py-3 md:py-4 text-left transition-all duration-300 border-b-2 md:border-l-4 md:border-b-0
                  ${
                    activeTab === item.id
                      ? "bg-red-600 md:bg-red-600 text-white shadow-lg border-red-400"
                      : "text-gray-300 hover:bg-slate-700 border-transparent"
                  }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden md:block font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 md:p-6 z-10 hidden md:block">
          <div className="flex items-center space-x-3 text-green-400 mb-2">
            <Wifi className="w-5 h-5" />
            <span className="font-medium text-sm">{t.connected}</span>
          </div>
          <p className="text-gray-400 text-sm">
            {t.time}: {mounted ? currentTime.toLocaleTimeString() : "--:--:--"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header with traditional elements */}
        <div className="bg-white shadow-sm p-4 md:p-6 relative flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              {sidebarItems.find((item) => item.id === activeTab)?.label}
            </h2>
          </div>
          <button
            onClick={toggleLanguage}
            className="p-2 text-sm md:hidden rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center space-x-1"
          >
            <Globe className="w-4 h-4" />
            <span>{t.langSwitch}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {activeTab === "timing" && (
            <div className="space-y-6 md:space-y-8">
              {/* Direction Tabs */}
              <div className="flex space-x-2 bg-white rounded-full p-1 shadow-inner w-fit">
                <button
                  onClick={() => setSelectedDirection("FromThimphu")}
                  className={`px-3 md:px-4 py-2 rounded-full transition-all text-sm font-medium ${
                    selectedDirection === "FromThimphu"
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {t.timing.fromThimphu}
                </button>
                <button
                  onClick={() => setSelectedDirection("ToPhuntsholing")}
                  className={`px-3 md:px-4 py-2 rounded-full transition-all text-sm font-medium ${
                    selectedDirection === "ToPhuntsholing"
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {t.timing.toThimphu}
                </button>
              </div>

              {/* Route Cards */}
              

              {/* Show Thimphu or Phuntsholing schedule based on selectedDirection */}
              <div className="bg-white rounded-xl shadow-md border-t-4 border-red-600 overflow-hidden">
                {selectedDirection === "FromThimphu" ? (
                  <ThimphuBusSchedule />
                ) : selectedDirection === "ToPhuntsholing" ? (
                  <PhuntsholingBusSchedule />
                ) : null}
              </div>
            </div>
          )}

          {activeTab === "routes" && (
            <>
              {!selectedRoute ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {busRoutes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRoute(route)}
                      className="bg-white rounded-xl p-6 md:p-8 shadow-md border-l-4 border-red-600 hover:shadow-lg transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${route.color}`}
                        >
                          <Bus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">
                          {route.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-4 md:mb-6">
                        {/* No destination property, so nothing to show here */}
                      </p>
                      <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {t.routes.operatingHours}:
                          </span>
                          <span className="font-semibold text-gray-800">
                            5:30 AM - 10:30 PM
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {t.routes.frequency}:
                          </span>
                          <span className="font-semibold text-gray-800">
                            Every 20-30 min
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {t.routes.totalStops}:
                          </span>
                          <span className="font-semibold text-gray-800">
                            15 stops
                          </span>
                        </div>
                      </div>
                      <span className="block w-full mt-4 md:mt-6 bg-red-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-red-700 transition-all shadow-md font-semibold text-sm text-center">
                        {t.routes.viewFullRoute}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="max-w-lg mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md border-l-4 border-red-600">
                  <button
                    onClick={() => setSelectedRoute(null)}
                    className="mb-4 text-sm text-red-600 hover:underline focus:outline-none"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${selectedRoute.color}`}
                    >
                      <Bus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      {selectedRoute.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 md:mb-6">
                    {/* No destination property, so nothing to show here */}
                  </p>
                  <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {t.routes.operatingHours}:
                      </span>
                      <span className="font-semibold text-gray-800">
                        5:30 AM - 10:30 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {t.routes.frequency}:
                      </span>
                      <span className="font-semibold text-gray-800">
                        Every 20-30 min
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {t.routes.totalStops}:
                      </span>
                      <span className="font-semibold text-gray-800">
                        15 stops
                      </span>
                    </div>
                  </div>
                  {/* Example: Add more detailed info here if available */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Route Details
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Stop 1: Main Terminal</li>
                      <li>Stop 2: Hospital</li>
                      <li>Stop 3: Rinchending</li>
                      <li>Stop 4: Town Center</li>
                      <li>Stop 5: Final Stop</li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "live" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-t-4 border-green-600">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  {t.live.header}
                </h3>
                {/* Bus Map */}
                <div className="mb-6">
                  <BusMap buses={liveBuses} />
                </div>
                {/* List of live buses below the map (optional, can keep for details) */}
                <div className="space-y-3 md:space-y-4">
                  {liveBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <div className="p-2 bg-slate-200 rounded-md">
                          <Bus className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">
                            {t.timing.bus} #{bus.id}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Route {bus.route} • {t.timing.driver}: {bus.driver}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 w-full md:w-auto justify-between">
                        <div className="text-right">
                          <p className="font-semibold text-gray-800 text-sm">
                            {bus.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            {bus.distance} {t.live.away}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-800 text-sm">
                            {bus.passengers}/60
                          </p>
                          <p className="text-xs text-gray-500">
                            {t.live.passengers}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "balance" && (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border-t-4 border-red-600">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full mx-auto mb-2 md:mb-3 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    {t.balance.header}
                  </h3>
                  <p className="text-gray-500 text-sm">{t.balance.subtitle}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {t.balance.cardNumber}
                    </label>
                    <input
                      type="text"
                      value={cardBalance}
                      onChange={(e) => setCardBalance(e.target.value)}
                      placeholder={t.balance.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-all text-sm"
                    />
                  </div>
                  <button
                    onClick={checkBalance}
                    className="w-full bg-red-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-red-700 transition-all shadow-md font-semibold text-sm"
                  >
                    {t.balance.checkBalance}
                  </button>
                </div>

                {balanceResult && (
                  <div className="mt-4 md:mt-6 p-4 rounded-lg border border-gray-200">
                    {balanceResult.error ? (
                      <div className="text-red-600 text-center text-sm">
                        <p className="font-semibold">{t.balance.error}</p>
                        <p className="mt-1">{balanceResult.error}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="bg-green-600 text-white p-3 md:p-4 rounded-lg mb-2 md:mb-3">
                          <p className="text-sm">{t.balance.cardBalance}</p>
                          <p className="text-2xl md:text-3xl font-bold mt-1">
                            Nu. {balanceResult.balance}
                          </p>
                        </div>
                        <div className="text-gray-600 space-y-1 text-xs md:text-sm">
                          <p>
                            Card: ****
                            {balanceResult.cardNumber
                              ? balanceResult.cardNumber.slice(-4)
                              : ""}
                          </p>
                          <p>
                            {t.balance.lastUsed}: {balanceResult.lastUsed}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 md:mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 text-center text-sm">
                    {t.balance.quickTopUp}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["Nu. 50", "Nu. 100", "Nu. 200"].map((amount) => (
                      <button
                        key={amount}
                        className="py-2 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-sm font-semibold text-xs"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BhuBusDashboard;
