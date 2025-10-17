import Agent from "../models/Agent.js";
import Assignment from "../models/Assignment.js";
import fs from "fs";
import { parse } from "csv-parse";

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        const requiredCols = ["FirstName", "Phone", "Notes"];
        const firstRow = results[0];
        if (!firstRow || !requiredCols.every(col => Object.keys(firstRow).includes(col))) {
          fs.unlinkSync(filePath);
          return res.status(400).json({ message: "CSV must contain FirstName, Phone, and Notes columns" });
        }

        try {
          const agents = await Agent.find();
          if (agents.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: "No agents found. Please create at least one agent." });
          }

          const totalRows = results.length;
          const numAgents = agents.length;
          const baseCount = Math.floor(totalRows / numAgents);
          let remainder = totalRows % numAgents;

          let currentIndex = 0;

          for (let i = 0; i < agents.length; i++) {
            const rowsForThisAgent = baseCount + (remainder > 0 ? 1 : 0);
            if (remainder > 0) remainder--;

            for (let j = 0; j < rowsForThisAgent; j++) {
              const row = results[currentIndex];
              if (!row) continue;

              await Assignment.create({
                agent: agents[i]._id,
                firstName: row.FirstName,
                phone: row.Phone,
                notes: row.Notes,
                uploadedBy: req.user._id,
              });

              currentIndex++;
            }
          }

          fs.unlinkSync(filePath);
          res.json({ message: "CSV uploaded and distributed successfully" });
        } catch (err) {
          fs.unlinkSync(filePath);
          res.status(500).json({ message: err.message });
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("agent", "name email")
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No distributed lists found" });
    }

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};