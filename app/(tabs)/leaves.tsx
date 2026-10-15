import { useRouter } from "expo-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import APIClient from "@/lib/api-client";
import {
  createLeave,
  getApiErrorMessage,
  getLeaves,
  LeaveHistoryItem,
} from "@/services/leaves";

// The parts of GET /api/users/me that this screen needs
type Me = {
  _id: string;
  companyId: string;
  leaveBalance: Record<string, number>;
};

// ---- helpers ---------------------------------------------------------------
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// "YYYY-MM-DD" -> Date (UTC midnight), or null if it isn't a real calendar date
function parseDate(value: string): Date | null {
  if (!DATE_RE.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  // rejects rollovers such as 2026-02-31
  return date.toISOString().slice(0, 10) === value ? date : null;
}

// inclusive day count: 2026-10-05 to 2026-10-08 = 4
function countDays(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}

const typeLabel = (type: string) =>
  `${type.charAt(0).toUpperCase()}${type.slice(1)} Leave`;

function statusColors(status: string) {
  switch ((status ?? "").toLowerCase()) {
    case "approved":
      return { bg: "#DCFCE7", fg: "#15803D" };
    case "rejected":
      return { bg: "#FEE2E2", fg: "#B91C1C" };
    case "pending":
      return { bg: "#FEF3C7", fg: "#B45309" };
    default:
      return { bg: "#F5F5F5", fg: "#525252" };
  }
}

// ---- screen ----------------------------------------------------------------
export default function LeaveRequestScreen() {
  const router = useRouter();

  const [me, setMe] = useState<Me | null>(null);
  const [history, setHistory] = useState<LeaveHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [leaveType, setLeaveType] = useState("annual");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load who I am (id, company, balances) and my leave history together
  const loadData = useCallback(async () => {
    try {
      const [meRes, leaves] = await Promise.all([
        APIClient().getMethod("/api/users/me"),
        getLeaves(),
      ]);
      const user = (meRes?.data ?? meRes) as Me;
      setMe(user);
      setHistory(leaves);
      setLoadError("");
      // make sure the selected type is one the backend actually has
      const types = Object.keys(user.leaveBalance ?? {});
      setLeaveType((prev) =>
        types.includes(prev) ? prev : (types[0] ?? prev),
      );
    } catch (error) {
      setLoadError(
        getApiErrorMessage(error, "Could not load your leave information."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const leaveTypes = me ? Object.keys(me.leaveBalance ?? {}) : [];

  // Balance comes from the server, which deducts it when a request is made
  const remainingDays = me?.leaveBalance?.[leaveType] ?? 0;
  const usedDays = history
    .filter(
      (item) =>
        item.leaveType === leaveType &&
        (item.status ?? "").toLowerCase() !== "rejected",
    )
    .reduce((sum, item) => sum + (Number(item.totalDays) || 0), 0);

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!me) return;

    const start = parseDate(startDate.trim());
    const end = parseDate(endDate.trim());

    if (!start || !end) {
      setErrorMessage("Enter valid start and end dates (YYYY-MM-DD).");
      return;
    }
    if (end < start) {
      setErrorMessage("The end date cannot be before the start date.");
      return;
    }
    const totalDays = countDays(start, end);
    if (totalDays > remainingDays) {
      setErrorMessage(
        `You requested ${totalDays} days but only have ${remainingDays} ${leaveType} days left.`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createLeave({
        companyId: me.companyId,
        employee: me._id,
        leaveType,
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        totalDays,
        ...(reason.trim() ? { reason: reason.trim() } : {}),
      });
      setSuccessMessage(
        result?.message ?? "Your leave request has been submitted.",
      );
      setStartDate("");
      setEndDate("");
      setReason("");
      await loadData(); // the server changed the balance, so reload it
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Failed to submit leave request."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/employeeHome");
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{loadError}</Text>
        <TouchableOpacity
          style={[styles.submitButton, styles.retryButton]}
          onPress={() => {
            setLoading(true);
            loadData();
          }}
        >
          <Text style={styles.submitButtonText}>Try again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft stroke="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave request</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {!!successMessage && (
          <View style={[styles.banner, styles.successBanner]}>
            <CheckCircle2
              stroke="#16A34A"
              size={20}
              style={styles.bannerIcon}
            />
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        )}

        {!!errorMessage && (
          <View style={[styles.banner, styles.errorBanner]}>
            <AlertCircle stroke="#DC2626" size={20} style={styles.bannerIcon} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <View style={styles.balanceCard}>
          <View style={styles.cardHeaderRow}>
            <Calendar
              stroke="#000000"
              size={18}
              style={styles.cardHeaderIcon}
            />
            <Text style={styles.cardTitle}>Leave balance</Text>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.progressRingOuter}>
              <View style={styles.progressRingBlueSegment} />
              <View style={styles.progressRingInner}>
                <Text style={styles.daysNumber}>{remainingDays}</Text>
                <Text style={styles.daysLabel}>Days available</Text>
              </View>
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendRow}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#3B82F6" }]}
                />
                <Text style={styles.legendText}>Used</Text>
                <Text style={styles.legendValue}>{usedDays} days</Text>
              </View>
              <View style={styles.legendRow}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#000000" }]}
                />
                <Text style={styles.legendText}>Remaining</Text>
                <Text style={styles.legendValue}>{remainingDays} days</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.formSectionTitle}>Request leave</Text>

        <View style={[styles.inputGroup, { zIndex: 10 }]}>
          <Text style={styles.inputLabel}>Leave type</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownTextSelected}>
              {leaveType ? typeLabel(leaveType) : "Select type"}
            </Text>
            <Text
              style={[
                styles.dropdownArrow,
                isDropdownOpen && styles.dropdownArrowOpen,
              ]}
            >
              ⌃
            </Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {leaveTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.dropdownOption,
                    leaveType === type && styles.dropdownOptionActive,
                  ]}
                  onPress={() => {
                    setLeaveType(type);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      leaveType === type && styles.dropdownOptionTextActive,
                    ]}
                  >
                    {typeLabel(type)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Start date</Text>
          <View style={styles.inputWithIconContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A3A3A3"
              value={startDate}
              onChangeText={setStartDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Calendar stroke="#737373" size={20} style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>End date</Text>
          <View style={styles.inputWithIconContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A3A3A3"
              value={endDate}
              onChangeText={setEndDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Calendar stroke="#737373" size={20} style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Reason</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Add a reason (optional)"
            placeholderTextColor="#A3A3A3"
            multiline={true}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Request</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.formSectionTitle}>Leave history</Text>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No leave requests yet.</Text>
        ) : (
          history.map((item, index) => {
            const colors = statusColors(item.status);
            return (
              <View
                key={item._id ?? `${item.startDate}-${index}`}
                style={styles.historyRow}
              >
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTitle}>
                    {typeLabel(item.leaveType)}
                  </Text>
                  <Text style={styles.historyMeta}>
                    {item.startDate.slice(0, 10)} to {item.endDate.slice(0, 10)}{" "}
                    · {item.totalDays} {item.totalDays === 1 ? "day" : "days"}
                  </Text>
                  {!!item.reason && (
                    <Text style={styles.historyMeta} numberOfLines={1}>
                      {item.reason}
                    </Text>
                  )}
                </View>
                <View
                  style={[styles.statusPill, { backgroundColor: colors.bg }]}
                >
                  <Text style={[styles.statusText, { color: colors.fg }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#FFF",
    borderBottomColor: "#F0F0F0",
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    marginBottom: 24,
    padding: 16,
  },
  banner: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
  },
  bannerIcon: {
    marginRight: 8,
  },
  backButton: {
    marginRight: 16,
  },
  cardHeaderIcon: {
    marginRight: 6,
  },
  cardHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  cardTitle: {
    color: "#737373",
    fontSize: 14,
    fontWeight: "600",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  chartContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  daysLabel: {
    color: "#A3A3A3",
    fontSize: 10,
  },
  daysNumber: {
    color: "#000",
    fontSize: 22,
    fontWeight: "800",
  },
  disabledButton: {
    opacity: 0.6,
  },
  dropdownArrow: {
    color: "#737373",
    fontSize: 16,
  },
  dropdownArrowOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownMenu: {
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    paddingVertical: 4,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownOptionActive: {
    backgroundColor: "#EFF6FF",
  },
  dropdownOptionText: {
    color: "#404040",
    fontSize: 14,
  },
  dropdownOptionTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  dropdownTrigger: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownTextSelected: {
    color: "#000",
    flex: 1,
    fontSize: 14,
  },
  emptyText: {
    color: "#737373",
    fontSize: 13,
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
  },
  errorText: {
    color: "#B91C1C",
    flex: 1,
    fontWeight: "500",
  },
  formSectionTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 8,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomColor: "#F5F5F5",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  historyInfo: {
    flex: 1,
    paddingRight: 8,
  },
  historyMeta: {
    color: "#737373",
    fontSize: 12,
    marginTop: 2,
  },
  historyRow: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    padding: 12,
  },
  historyTitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputIcon: {
    marginLeft: 8,
  },
  inputLabel: {
    color: "#404040",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputWithIcon: {
    color: "#000",
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
  },
  inputWithIconContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  legendContainer: {
    gap: 12,
  },
  legendDot: {
    borderRadius: 5,
    height: 10,
    marginRight: 8,
    width: 10,
  },
  legendRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  legendText: {
    color: "#737373",
    fontSize: 12,
    width: 70,
  },
  legendValue: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  progressRingBlueSegment: {
    borderColor: "#3B82F6",
    borderLeftColor: "transparent",
    borderRadius: 50,
    borderTopColor: "transparent",
    borderWidth: 6,
    height: 100,
    position: "absolute",
    width: 100,
  },
  progressRingInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressRingOuter: {
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderRadius: 50,
    borderWidth: 6,
    height: 100,
    justifyContent: "center",
    position: "relative",
    width: 100,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 32,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 110,
  },
  statusPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    marginBottom: 24,
    paddingVertical: 14,
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  successBanner: {
    backgroundColor: "#DCFCE7",
  },
  successText: {
    color: "#15803D",
    flex: 1,
    fontWeight: "500",
  },
  textArea: {
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    color: "#000",
    fontSize: 14,
    minHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
