import type { Request, Response } from "express";
import { Router } from "express";
import { Incident, IncidentSeverity } from "../models/incident";  

const router = Router();

// In-memory storage for incidents
const incidents: Incident[] = [];   
const validSeverities: IncidentSeverity[] = ["low", "medium", "high"];

// Get returns all incidents
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    count: incidents.length,
     incidents
  });
});
// Create a new incident
router.post("/", (req: Request, res: Response) => {
  const { title, severity, service, description } = req.body ?? {};
 
  
if (typeof title !== "string" || title.trim().length === 0) {
  return res.status(400).json({
    error: "title must be a non-empty string"
  });
}

if (typeof service !== "string" || service.trim().length === 0) {
  return res.status(400).json({
    error: "service must be a non-empty string"
  });
}

if (typeof description !== "string" || description.trim().length === 0) {
  return res.status(400).json({
    error: "description must be a non-empty string"
  });
}

    if( typeof severity !== "string" || 
        !validSeverities.includes(severity as IncidentSeverity)
    ) {
     res.status(400).json({ error: "severity must be low, medium or high" });
return;
    }   

    const newIncident: Incident = {
        id:`inc-${Date.now()}`,
        title: title.trim(),    
        severity: severity as IncidentSeverity,
        service: service.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString()
    };
    incidents.push(newIncident);
    res.status(201).json(newIncident); 
});
export default router; 