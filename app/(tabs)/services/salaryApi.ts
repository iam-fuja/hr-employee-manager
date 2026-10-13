const API_BASE_URL = ""; // Add your backend URL when your team provides it.

export async function getEmployeeSalary(
  employeeId: string,
  token: string
) {
  if (!API_BASE_URL) {
    throw new Error("Backend URL has not been provided yet.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/salary/${encodeURIComponent(employeeId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch salary. Status: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Could not retrieve employee salary.");
  }

  return result.data;
}