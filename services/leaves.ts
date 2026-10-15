import axios from "axios";

import APIClient from "@/lib/api-client";

export type LeaveHistoryItem = {
  _id?: string;
  leaveType: string;
  startDate: string; // ISO, e.g. "2026-10-05T00:00:00.000Z"
  endDate: string;
  totalDays: number;
  reason?: string;
  status: string; // e.g. "Pending"
};

export type CreateLeavePayload = {
  companyId: string;
  employee: string; // the user's _id from /api/users/me
  leaveType: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;
  totalDays: number;
  reason?: string;
};

// GET /api/leaves -> { success, count, data: [...] }
export async function getLeaves(): Promise<LeaveHistoryItem[]> {
  const res = await APIClient().getMethod("/api/leaves");
  return res?.data ?? [];
}

// POST /api/leaves -> 201 { success, message, data: { leaveType, status } }
export async function createLeave(payload: CreateLeavePayload) {
  return APIClient().postMethod("/api/leaves", payload);
}

// One place that turns any thrown error into text for the screen
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Check your connection and try again.";
    }
    if (error.response.status === 401) {
      return "Your session has expired. Please log in again.";
    }
    const data = error.response.data as { message?: string } | undefined;
    return data?.message ?? fallback;
  }
  return fallback;
}
