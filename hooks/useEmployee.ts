import { useEffect, useState } from "react";
import APIClient from "@/lib/api-client";

export type Employee = {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  jobTitle: string;
  leaveBalance: {
    annual: number;
    sick: number;
    maternity: number;
    casual: number;
  };
};

export function useEmployee() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await APIClient().getMethod("/api/users/me");
        setEmployee(result.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { employee, loading };
}
