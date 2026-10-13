import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://hr-staffflow-backend.onrender.com";

// Connect these to the existing authentication system when available.
const ACCESS_TOKEN = "";
const EMPLOYEE_ID = "";

type SalaryData = {
  employee: string;
  baseSalary: number;
  deductions: unknown[];
  paymentFrequency: string;
};

type ApiResponse = {
  success: boolean;
  data?: SalaryData;
  message?: string;
};

export default function PayslipScreen() {
  const [salary, setSalary] = useState<SalaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notConnected, setNotConnected] = useState(false);

  const fetchSalary = useCallback(async () => {
    setError("");
    setNotConnected(false);

    if (!ACCESS_TOKEN || !EMPLOYEE_ID) {
      setSalary(null);
      setNotConnected(true);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/salary/${encodeURIComponent(EMPLOYEE_ID)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok || result.success !== true || !result.data) {
        throw new Error(
          result.message || "Unable to retrieve salary information."
        );
      }

      setSalary(result.data);
    } catch (err) {
      setSalary(null);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSalary();
    }, [fetchSalary])
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderStatus = () => {
    if (loading) {
      return (
        <View style={styles.statusCard}>
          <ActivityIndicator size="large" color="#F5A146" />
          <Text style={styles.statusTitle}>
            Loading salary information
          </Text>
          <Text style={styles.statusText}>
            Please wait while we retrieve your information.
          </Text>
        </View>
      );
    }

    if (notConnected) {
      return (
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.iconText}>i</Text>
          </View>

          <Text style={styles.statusTitle}>
            Salary information not connected
          </Text>

          <Text style={styles.statusText}>
            Your payslip screen is ready. We need your login access
            token and employee user ID before we can retrieve your
            salary information.
          </Text>

          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>What's needed?</Text>
            <Text style={styles.noticeText}>
              • Access token from the login system
            </Text>
            <Text style={styles.noticeText}>
              • MongoDB User Object ID
            </Text>
          </View>

          <Text style={styles.smallText}>
            No sample salary figures are displayed.
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.statusCard}>
          <Text style={styles.errorTitle}>
            Unable to load salary
          </Text>

          <Text style={styles.statusText}>{error}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={fetchSalary}
          >
            <Text style={styles.primaryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchSalary}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Payslip</Text>
            <Text style={styles.subtitle}>
              Your salary information in one place
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>₦</Text>
          </View>
        </View>

        {salary ? (
          <>
            <View style={styles.salaryCard}>
              <Text style={styles.cardLabel}>Base Salary</Text>

              <Text style={styles.salaryAmount}>
                {formatCurrency(salary.baseSalary)}
              </Text>

              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>
                  {salary.paymentFrequency}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>
                Employee Information
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.label}>
                  Employee Reference
                </Text>
                <Text style={styles.value}>
                  {salary.employee}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.label}>
                  Payment Frequency
                </Text>
                <Text style={styles.value}>
                  {salary.paymentFrequency}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Deductions</Text>

              {Array.isArray(salary.deductions) &&
              salary.deductions.length > 0 ? (
                <>
                  <Text style={styles.deductionCount}>
                    {salary.deductions.length} deduction item(s)
                    returned
                  </Text>

                  {salary.deductions.map((item, index) => {
                    let description = "";

                    if (typeof item === "string") {
                      description = item;
                    } else if (
                      typeof item === "number" ||
                      typeof item === "boolean"
                    ) {
                      description = String(item);
                    } else if (
                      item !== null &&
                      typeof item === "object"
                    ) {
                      const entry = item as Record<string, unknown>;
                      const title =
                        entry.name ??
                        entry.type ??
                        entry.description;

                      description =
                        typeof title === "string"
                          ? title
                          : `Deduction item ${index + 1}`;
                    } else {
                      description = `Deduction item ${index + 1}`;
                    }

                    return (
                      <View
                        key={index}
                        style={styles.deductionRow}
                      >
                        <View style={styles.deductionDot} />
                        <Text style={styles.deductionText}>
                          {description}
                        </Text>
                      </View>
                    );
                  })}
                </>
              ) : (
                <View style={styles.emptyDeduction}>
                  <Text style={styles.emptyDeductionTitle}>
                    No deduction details listed
                  </Text>
                  <Text style={styles.emptyDeductionText}>
                    The backend has not provided any deduction items.
                  </Text>
                </View>
              )}
            </View>
          </>
        ) : (
          renderStatus()
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Salary information is displayed according to the data
            provided by your organization's backend.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1B3A4B",
  },
  subtitle: {
    fontSize: 13,
    color: "#718096",
    marginTop: 6,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FDEBD9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#D9822B",
  },
  salaryCard: {
    backgroundColor: "#1B3A4B",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  cardLabel: {
    color: "#D9E5EC",
    fontSize: 14,
    marginBottom: 12,
  },
  salaryAmount: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 18,
  },
  frequencyBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#355464",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  frequencyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1B3A4B",
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: "#718096",
  },
  value: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#1A202C",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 8,
  },
  deductionCount: {
    fontSize: 13,
    color: "#718096",
    marginBottom: 10,
  },
  deductionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
  deductionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F5A146",
    marginRight: 10,
  },
  deductionText: {
    flex: 1,
    fontSize: 14,
    color: "#1A202C",
  },
  emptyDeduction: {
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    padding: 16,
  },
  emptyDeductionTitle: {
    color: "#1B3A4B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptyDeductionText: {
    color: "#718096",
    fontSize: 13,
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 4,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDEBD9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#D9822B",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1B3A4B",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: "#718096",
    lineHeight: 22,
    textAlign: "center",
  },
  notice: {
    width: "100%",
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  noticeTitle: {
    color: "#1B3A4B",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  noticeText: {
    color: "#4A5568",
    fontSize: 13,
    lineHeight: 23,
  },
  smallText: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    marginTop: 18,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#C53030",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#F5A146",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#1B3A4B",
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  footerText: {
    color: "#718096",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },
});