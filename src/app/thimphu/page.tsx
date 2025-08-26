"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ================== SAMPLE DATA ==================

// Day Routes
const dayRoutes = [
  {
    route: "Thinley Dorji (Via Town) – Route 1K",
    bus: "BG-1.A0021",
    schedule: ["7:00 AM", "8:20 AM", "9:45 AM", "11:55 PM", "2:05 PM", "4:00 PM", "5:20 PM"],
  },
  {
    route: "Leki Tshering (Via Town) – Route 1L",
    bus: "BG-1.A0060",
    schedule: ["7:08 AM", "8:28 AM", "9:58 AM", "12:08 PM", "2:18 PM", "4:08 PM", "5:28 PM"],
  },
  {
    route: "Karma C (Via Hospital) – Route 1M",
    bus: "BG-1.A0054",
    schedule: ["7:16 AM", "8:36 AM", "10:11 AM", "12:21 PM", "2:31 PM", "4:16 PM", "5:36 PM"],
  },
  {
    route: "Kado (Via Town) – Route 1N",
    bus: "BG-1.A0043",
    schedule: ["7:24 AM", "8:44 AM", "10:24 AM", "12:34 PM", "2:44 PM", "4:24 PM", "5:44 PM"],
  },
  {
    route: "Yonten Jamtsho A (Via Hospital) – Route 1O",
    bus: "BG-1.A0063",
    schedule: ["7:32 AM", "8:52 AM", "10:37 AM", "12:47 PM", "2:57 PM", "4:32 PM", "5:52 PM"],
  },
  {
    route: "Tshering Dawa (Via Town) – Route 1P",
    bus: "BG-1.A0029",
    schedule: ["7:40 AM", "9:00 AM", "10:50 AM", "1:00 PM", "3:10 PM", "4:40 PM", "6:00 PM"],
  },
  {
    route: "Sonam Thinley (Via Hospital) – Route 1Q",
    bus: "BG-1.A0058",
    schedule: ["7:48 AM", "9:08 AM", "11:03 AM", "1:13 PM", "3:23 PM", "4:48 PM", "6:08 PM"],
  },
  {
    route: "Lobzang Dema (Via Town) – Route 1S",
    bus: "BG-1.A0049",
    schedule: ["7:56 AM", "9:16 AM", "11:16 AM", "1:26 PM", "3:36 PM", "4:56 PM", "6:16 PM"],
  },
  {
    route: "Dorji Chedrup (Via Hospital) – Route 1U",
    bus: "BG-1.A0016",
    schedule: ["8:04 AM", "9:24 AM", "11:29 AM", "1:39 PM", "3:49 PM", "5:04 PM", "6:24 PM"],
  },
  {
    route: "Karma B (Via Town) – Route 1T",
    bus: "BG-1.A0075",
    schedule: ["8:12 AM", "9:32 AM", "11:42 AM", "1:52 PM", "3:55 PM", "5:12 PM", "6:30 PM"],
  },
];

// Night Routes
const nightRoutes = [
  {
    route: "Dechencholing via Pamtsho A",
    bus: "BG-1.A.0012",
    schedule: ["7:30 PM", "9:00 PM", "10:30 PM", "12:00 AM"],
  },
  {
    route: "Dechencholing via Pamtsho B",
    bus: "BG-1.A.0697",
    schedule: ["8:00 PM", "9:30 PM", "11:00 PM", "12:30 AM"],
  },
  {
    route: "Dechencholing via Pamtsho C",
    bus: "BG-1.A.0088",
    schedule: ["8:30 PM", "10:00 PM", "11:30 PM"],
  },
  {
    route: "Babesa via Olakha A",
    bus: "BG-1.A.0023",
    schedule: ["7:30 PM", "9:00 PM", "10:30 PM", "12:00 AM"],
  },
  {
    route: "Babesa via Olakha B",
    bus: "BG-1.A.0010",
    schedule: ["8:00 PM", "9:30 PM", "11:00 PM", "12:30 AM"],
  },
  {
    route: "Babesa via Olakha C",
    bus: "BG-1.A.0695",
    schedule: ["8:30 PM", "10:00 PM", "11:30 PM"],
  },
  {
    route: "Lungtenphu via Ngabiphu A",
    bus: "BG-1.A.0022",
    schedule: ["7:30 PM", "9:00 PM", "10:30 PM", "12:00 AM"],
  },
  {
    route: "Lungtenphu via Ngabiphu B",
    bus: "BG-1.A.0014",
    schedule: ["8:00 PM", "9:30 PM", "11:00 PM", "12:30 AM"],
  },
  {
    route: "Lungtenphu via Ngabiphu C",
    bus: "BG-1.A.0704",
    schedule: ["8:30 PM", "10:00 PM", "11:30 PM"],
  },
  {
    route: "Motithang via Changidaphu/Zilukha",
    bus: "BG-2.A.0573",
    schedule: ["7:30 PM", "8:30 PM", "9:30 PM", "10:30 PM"],
  },
  {
    route: "Motithang via Zilukha/Changidaphu",
    bus: "BG-2.A.0579",
    schedule: ["7:30 PM", "8:30 PM", "9:30 PM", "10:30 PM"],
  },
];

// ================== PAGE COMPONENT ==================
export default function ThimphuBusSchedule() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
          Thimphu City Bus Schedule
        </h1>

        {/* Day Routes */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Day Routes</h2>
        {dayRoutes.map((route, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0} className="mb-4 shadow-md rounded-xl">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-blue-500 text-white font-semibold">
              {route.route} — ({route.bus})
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <TableContainer component={Paper}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold">Trip No.</TableCell>
                      <TableCell className="font-bold">Departure Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {route.schedule.map((time, i) => (
                      <TableRow
                        key={i}
                        className="hover:bg-blue-50"
                        sx={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "white" }}
                      >
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Night Routes */}
        <h2 className="text-2xl font-bold text-purple-600 mt-10 mb-4">Night Routes</h2>
        {nightRoutes.map((route, idx) => (
          <Accordion key={idx} className="mb-4 shadow-md rounded-xl">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-purple-500 text-white font-semibold">
              {route.route} — ({route.bus})
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <TableContainer component={Paper}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold">Trip No.</TableCell>
                      <TableCell className="font-bold">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {route.schedule.map((time, i) => (
                      <TableRow
                        key={i}
                        className="hover:bg-purple-50"
                        sx={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "white" }}
                      >
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
