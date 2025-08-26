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

// Example data – replace with your actual timings
const busData = [
  {
    route: "Route 1: City Bus Terminal → Pasakha Industrial Estate",
    schedule: [
      { departure: "6:15 AM", arrival: "7:00 AM" },
      { departure: "7:30 AM", arrival: "8:15 AM" },
      { departure: "8:50 AM", arrival: "9:45 AM" },
    ],
  },
  {
    route: "Route 2: BFAL → Chumithang Middle Secondary School",
    schedule: [
      { departure: "7:30 AM", arrival: "—" },
      { departure: "1:20 PM", arrival: "—" },
    ],
  },
  {
    route: "Route 3: Mallbase → Chumithang Middle Secondary School",
    schedule: [
      { departure: "6:20 AM", arrival: "—" },
      { departure: "7:10 AM", arrival: "—" },
    ],
  },
];

export default function PhuntsholingBusSchedule() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-sm">
          Phuntsholing City Bus Timing Schedule
        </h1>

        {busData.map((route, index) => (
          <Accordion key={index} defaultExpanded={index === 0} className="mb-4 shadow-lg rounded-xl">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-blue-600 text-white font-semibold">
              {route.route}
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <TableContainer component={Paper} className="rounded-b-xl overflow-x-auto">
                <Table stickyHeader aria-label="bus schedule table">
                  <TableHead>
                    <TableRow className="bg-blue-100">
                      <TableCell className="font-bold">Departure</TableCell>
                      <TableCell className="font-bold">Arrival</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {route.schedule.map((row, i) => (
                      <TableRow
                        key={i}
                        className="hover:bg-blue-50 transition-colors"
                        sx={{
                          backgroundColor: i % 2 === 0 ? "#f9fafb" : "white", // zebra striping
                        }}
                      >
                        <TableCell>{row.departure}</TableCell>
                        <TableCell>{row.arrival}</TableCell>
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
