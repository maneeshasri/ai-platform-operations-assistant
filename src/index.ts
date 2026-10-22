
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
    status: "healthy",
    responseTimeMs: 120
  },
  {
    id: "svc-003",
    name: "Incident Processor",
    status: "healthy",
    responseTimeMs: 120
  },
  {
    id: "svc-004",
    name: "Notification Service",
    status: "healthy",
    responseTimeMs: 120
  }
];

function reportServiceHealth(serviceList: CloudService[]): void {
  console.log("=== Cloud Operations Platform ===");
  const unhealthyServices = serviceList.filter(isUnhealthy);
 const degradedServices = serviceList.filter(isDegraded);
 const healthyServices = serviceList.filter(isHealthy);
 const averageResponseTime = getAverageResponseTime(serviceList);
 for (const service of serviceList) {
    console.log(
      `${service.name}: ${service.status} (${service.responseTimeMs} ms)`
    );
  }
   const unhealthyCount = serviceList.filter(
    (service) => service.status === "unhealthy"
  ).length;
  const degradedCount = serviceList.filter(
    (service) => service.status === "degraded"
  ).length;
  const healthyCount = serviceList.filter(
    (service) => service.status === "healthy"
  ).length;
  
  console.log(`Services monitored: ${serviceList.length}`);
  console.log(`Unhealthy services: ${unhealthyServices.length}`);
  console.log(`Degraded services: ${degradedServices.length}`);
  console.log(`Average response time: ${averageResponseTime} ms`);
  console.log(`Healthy services: ${healthyServices.length}`);

  if (unhealthyServices.length > 0) {
    console.log("\nALERT: Unhealthy services detected!");

    for (const service of unhealthyServices) {
      console.log(`- ${service.name}`);
    }
}else {
    console.log("\nAll services are operational.");
  }

}
function isHealthy(service: CloudService): boolean {
  return service.status === "healthy";
}

function isUnhealthy(service: CloudService): boolean {
  return service.status === "unhealthy";
}

function isDegraded(service: CloudService): boolean {
  return service.status === "degraded";
}

function getAverageResponseTime(serviceList: CloudService[]): number {
  if (serviceList.length === 0) {
    return 0;
  }
  const total = serviceList.reduce(
    (sum, service) => sum + service.responseTimeMs,
    0
  );

  return Math.round(total / serviceList.length);
 
   
}


reportServiceHealth(services);

