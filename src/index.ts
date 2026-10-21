export type Incident = {
  id: string;
  serviceName: string;
  severity: string;
  status: string;
};
const incident: Incident = {
  id: "INC-001",
  serviceName: "payments",
  severity: "high",
  status: "open",
};

const message: string = "Hello from TypeScript!";

console.log(message);
console.log(incident);
console.log(JSON.stringify(incident, null, 2));
