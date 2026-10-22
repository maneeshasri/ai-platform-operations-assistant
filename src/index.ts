
type ServiceStatus = "healthy" | "degraded" | "unhealthy";

interface CloudService {
  id: string;
  name: string;
  status: ServiceStatus;
  responseTimeMs: number;
}

const services: CloudService[] = [
  {
    id: "svc-001",
    name: "Payments API",
    status: "healthy",
    responseTimeMs: 120
  },
  {
    id: "svc-002",
    name: "Authentication Service",
    status: "degraded",
    responseTimeMs: 850
  },
  {
    id: "svc-003",
    name: "Incident Processor",
    status: "unhealthy",
    responseTimeMs: 0
  }
];

function reportServiceHealth(serviceList: CloudService[]): void {
  console.log("=== Cloud Operations Platform ===");

  for (const service of serviceList) {
    console.log(
      `${service.name}: ${service.status} (${service.responseTimeMs} ms)`
    );
  }

  const unhealthyCount = serviceList.filter(
    (service) => service.status === "unhealthy"
  ).length;

  console.log(`Unhealthy services: ${unhealthyCount}`);
}

reportServiceHealth(services);
