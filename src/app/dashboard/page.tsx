"use client";

import React, { useState, useEffect } from "react";
import {
  Bus,
  Clock,
  MapPin,
  CreditCard,
  Route,
  Wifi,
  Globe,
} from "lucide-react";

const BhuBusDashboard = () => {
  const [activeTab, setActiveTab] = useState("timing");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardBalance, setCardBalance] = useState("");
  const [balanceResult, setBalanceResult] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState("FromThimphu");
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
      appName: "DrukBus",
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
        fromThimphu: "From Thimphu",
        toThimphu: "To Thimphu",
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

  const busRoutes = [
    {
      id: "T1",
      name: "Thimphu Express",
      destination: "Thimphu → Paro",
      color: "bg-orange-500",
    },
    {
      id: "P2",
      name: "Phuentsholing Local",
      destination: "Phuentsholing → Gelephu",
      color: "bg-blue-500",
    },
    {
      id: "W3",
      name: "Wangdue Route",
      destination: "Wangdue → Punakha",
      color: "bg-green-500",
    },
    {
      id: "B4",
      name: "Bumthang Connect",
      destination: "Bumthang → Trongsa",
      color: "bg-purple-500",
    },
  ];

  const busTimings = [
    {
      route: "T1",
      destination: "Thimphu Capital",
      nextArrival: "5 min",
      following: "25 min",
      status: "On Time",
      busNumber: "BHU-001",
      driver: "Pema Tshering",
    },
    {
      route: "P2",
      destination: "Paro Airport",
      nextArrival: "12 min",
      following: "35 min",
      status: "Delayed",
      busNumber: "BHU-102",
      driver: "Karma Dorji",
    },
    {
      route: "W3",
      destination: "Punakha Dzong",
      nextArrival: "18 min",
      following: "42 min",
      status: "On Time",
      busNumber: "BHU-203",
      driver: "Tashi Wangchuk",
    },
    {
      route: "B4",
      destination: "Trongsa Central",
      nextArrival: "28 min",
      following: "55 min",
      status: "On Time",
      busNumber: "BHU-304",
      driver: "Sonam Gyeltshen",
    },
  ];

  const liveBuses = [
    {
      id: "BHU-001",
      route: "T1",
      location: "Approaching Simtokha",
      distance: "2.3 km",
      passengers: 38,
      driver: "Pema Tshering",
    },
    {
      id: "BHU-102",
      route: "P2",
      location: "Near Chuzom Bridge",
      distance: "5.1 km",
      passengers: 24,
      driver: "Karma Dorji",
    },
    {
      id: "BHU-203",
      route: "W3",
      location: "Dochula Pass",
      distance: "8.7 km",
      passengers: 45,
      driver: "Tashi Wangchuk",
    },
    {
      id: "BHU-304",
      route: "B4",
      location: "Wangdue Town",
      distance: "12.4 km",
      passengers: 52,
      driver: "Sonam Gyeltshen",
    },
  ];

  useEffect(() => {
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
      });
    } else {
      setBalanceResult({ error: t.balance.errorMessage });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Time":
        return "text-green-700 bg-green-100 border border-green-300";
      case "Delayed":
        return "text-red-700 bg-red-100 border border-red-300";
      default:
        return "text-gray-700 bg-gray-100 border border-gray-300";
    }
  };

  const sidebarItems = [
    { id: "timing", label: t.tabs.timing, icon: Clock },
    { id: "routes", label: t.tabs.routes, icon: Route },
    { id: "live", label: t.tabs.live, icon: MapPin },
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

        <div className="absolute bottom-0 w-full p-4 md:p-6 relative z-10 hidden md:block">
          <div className="flex items-center space-x-3 text-green-400 mb-2">
            <Wifi className="w-5 h-5" />
            <span className="font-medium text-sm">{t.connected}</span>
          </div>
          <p className="text-gray-400 text-sm">
            {t.time}: {currentTime.toLocaleTimeString()}
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
                  onClick={() => setSelectedDirection("ToThimphu")}
                  className={`px-3 md:px-4 py-2 rounded-full transition-all text-sm font-medium ${
                    selectedDirection === "ToThimphu"
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {t.timing.toThimphu}
                </button>
              </div>

              {/* Route Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-8">
                {busRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                      <div
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${route.color}`}
                      ></div>
                      <h3 className="font-bold text-base md:text-lg text-gray-800">
                        {route.name}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {route.destination}
                    </p>
                  </div>
                ))}
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-md border-t-4 border-red-600 overflow-hidden">
                <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t.timing.header}
                  </h3>
                  <p className="text-gray-500 text-sm">{t.timing.subtitle}</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {busTimings.map((bus, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-6 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center space-x-4 md:space-x-6 mb-3 md:mb-0">
                          <div className="p-2 md:p-3 bg-gray-200 rounded-lg">
                            <Bus className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="text-base md:text-lg font-bold text-gray-800">
                              {bus.destination}
                            </h4>
                            <p className="text-gray-600 text-xs md:text-sm">
                              {t.timing.bus} #{bus.busNumber}
                            </p>
                            <p className="text-xs md:text-sm text-blue-600">
                              {t.timing.driver}: {bus.driver}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto justify-between md:justify-start">
                          <div className="text-center">
                            <p className="text-xl md:text-2xl font-bold text-red-600">
                              {bus.nextArrival}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.timing.next}
                            </p>
                          </div>
                          <div className="text-center hidden sm:block">
                            <p className="text-base md:text-lg font-semibold text-gray-600">
                              {bus.following}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.timing.following}
                            </p>
                          </div>
                          <div
                            className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              bus.status
                            )}`}
                          >
                            {bus.status === "On Time"
                              ? t.timing.statusOnTime
                              : t.timing.statusDelayed}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "routes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {busRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-md border-l-4 border-red-600 hover:shadow-lg transition-all duration-300"
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
                    {route.destination}
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
                  <button className="w-full mt-4 md:mt-6 bg-red-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-red-700 transition-all shadow-md font-semibold text-sm">
                    {t.routes.viewFullRoute}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "live" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-t-4 border-green-600">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  {t.live.header}
                </h3>
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
                          <p>Card: ****{balanceResult.cardNumber.slice(-4)}</p>
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
