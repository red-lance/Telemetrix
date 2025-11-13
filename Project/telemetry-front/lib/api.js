import axios from "axios";

export async function getTelemetryData() {
  try {
    const response = await axios.get("http://localhost:5000/api/telemetry");
    return response.data;
  } catch (error) {
    console.error("Error fetching telemetry:", error);
    return [];
  }
}
