// import { myStyles } from "@/styles/main";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const PRIMARY = "#407BFF";

// const leaveBalance = {
//   annualLeave: { total: 20, used: 5, remaining: 15 },
//   sickLeave: { total: 10, used: 2, remaining: 8 },
//   unpaidLeave: { total: 5, used: 1, remaining: 4 }
// };

// const initialHistory = [
//   { id: "1", type: "Annual Leave", month: "October", dateRange: "Oct 12 - Oct 17", status: "Approved", days: 5, statusColor: "#52C41A" },
//   { id: "2", type: "Sick Leave", month: "August", dateRange: "Aug 04 - Aug 06", status: "Approved", days: 2, statusColor: "#52C41A" },
//   { id: "3", type: "Unpaid Leave", month: "September", dateRange: "Sep 28", status: "Pending", days: 1, statusColor: "#FAAD14" },
//   { id: "4", type: "Annual Leave", month: "July", dateRange: "Jul 15 - Jul 18", status: "Rejected", days: 3, statusColor: "#FF4D4F" },
// ];

// type LeaveCardProps = { type: string; remaining: number; total: number; color: string };

// function LeaveBalanceCard({ type, remaining, total, color }: LeaveCardProps) {
//   return (
//     <View style={[myStyles.valueBox, { marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }]}>
//       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//         <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }} />
//         <Text style={[myStyles.valueText, { fontWeight: '600' }]}>{type}</Text>
//       </View>
//       <Text style={[myStyles.label, { marginBottom: 0 }]}>
//         <Text style={{ fontWeight: 'bold', color: '#4163d3' }}>{remaining}</Text> / {total} days left
//       </Text>
//     </View>
//   );
// }

// export default function LeavesScreen() {
//   const router = useRouter();
//   const [history, setHistory] = useState(initialHistory);

//   const handleNewRequest = () => {
//     alert("Opening New Leave Request Form...");
//   };

//   return (
//     <SafeAreaView style={myStyles.safe} edges={["top"]}>
      
//       <View style={myStyles.header}>
//         <View style={myStyles.headerSide} /> 
//         <Text style={myStyles.headerTitle}>Leave Management</Text>
//         <View style={[myStyles.headerSide, myStyles.headerRight]} />
//       </View>

//       <ScrollView
//         contentContainerStyle={[myStyles.scrolll, { paddingBottom: 40 }]}
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={[myStyles.label, { marginTop: 10, marginBottom: 2, fontSize: 18, fontWeight: 'bold', color: '#111' }]}>
//           Overview
//         </Text>
        
       
//         <Text style={{ fontSize: 14, color: '#666', fontWeight: '500', marginBottom: 14, paddingLeft: 4 }}>
//           Leave Balance (Tunde)
//         </Text>
        
//         <LeaveBalanceCard type="Annual Leave" remaining={leaveBalance.annualLeave.remaining} total={leaveBalance.annualLeave.total} color="#407BFF" />
//         <LeaveBalanceCard type="Sick Leave" remaining={leaveBalance.sickLeave.remaining} total={leaveBalance.sickLeave.total} color="#FF4D4F" />
//         <LeaveBalanceCard type="Unpaid Leave" remaining={leaveBalance.unpaidLeave.remaining} total={leaveBalance.unpaidLeave.total} color="#D46B08" />

//         {/* --- SECTION 2: NEW REQUEST BUTTON --- */}
//         <Pressable
//           onPress={handleNewRequest}
//           style={{
//             backgroundColor: PRIMARY,
//             padding: 14,
//             borderRadius: 8,
//             alignItems: 'center',
//             marginTop: 15,
//             marginBottom: 25,
//             flexDirection: 'row',
//             justifyContent: 'center',
//             gap: 8
//           }}
//           accessibilityRole="button"
//         >
//           <Ionicons name="add-circle-outline" size={20} color="#fff" />
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>New Request</Text>
//         </Pressable>

//         <Text style={[myStyles.label, { marginBottom: 12, fontSize: 16, fontWeight: 'bold', color: '#333' }]}>
//           Request History
//         </Text>

//         {history.map((item) => (
//           <View 
//             key={item.id} 
//             style={{ 
//               backgroundColor: '#ffffff',
//               borderRadius: 10,
//               padding: 16,
//               marginBottom: 14, 
//               flexDirection: 'row', 
//               justifyContent: 'space-between', 
//               alignItems: 'center',
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 1 },
//               shadowOpacity: 0.08,
//               shadowRadius: 3,
//               elevation: 2, 
//             }}
//           >
//             <View style={{ gap: 4, flex: 1, paddingRight: 8 }}>
//               <Text style={{ fontWeight: '700', fontSize: 15, color: '#111' }}>
//                 {item.type}
//               </Text>
              
//               <Text style={{ fontSize: 13, fontWeight: '600', color: '#4163d3', marginBottom: 2 }}>
//                 {item.dateRange}
//               </Text>

//               <Text style={{ fontSize: 12, color: '#777' }}>
//                 Month: {item.month}  •  {item.days} {item.days === 1 ? 'day' : 'days'}
//               </Text>
//             </View>

//             <View 
//               style={{ 
//                 backgroundColor: item.statusColor + "15", 
//                 paddingVertical: 6, 
//                 paddingHorizontal: 12, 
//                 borderRadius: 20,
//                 borderWidth: 1,
//                 borderColor: item.statusColor + "30"
//               }}
//             >
//               <Text style={{ color: item.statusColor, fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
//                 {item.status}
//               </Text>
//             </View>
//           </View>
//         ))}

//       </ScrollView>
//     </SafeAreaView>

import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
// To install icons: npm install lucide-react-native
import { ArrowLeft, Calendar } from 'lucide-react-native';

export default function LeaveRequestScreen() {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave request</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* --- LEAVE BALANCE CARD --- */}
        <View style={styles.balanceCard}>
          <View style={styles.cardHeaderRow}>
            <Calendar color="#000000" size={18} style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitle}>Leave balance</Text>
          </View>
          
          <View style={styles.chartContainer}>
            {/* Flawless, Proportional Circular Progress Ring */}
            <View style={styles.progressRingOuter}>
              {/* Blue active segment - adjusted to look like 40% (8 days) vs 60% (12 days) */}
              <View style={styles.progressRingBlueSegment} />
              <View style={styles.progressRingInner}>
                <Text style={styles.daysNumber}>12</Text>
                <Text style={styles.daysLabel}>Days available</Text>
              </View>
            </View>

            {/* Chart Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                <Text style={styles.legendText}>Used</Text>
                <Text style={styles.legendValue}>8 days</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#000000' }]} />
                <Text style={styles.legendText}>Remaining</Text>
                <Text style={styles.legendValue}>12 days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- FORM SECTION --- */}
        <Text style={styles.formSectionTitle}>Request leave</Text>

        {/* Leave Type Dropdown Picker placeholder */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Leave type</Text>
          <TouchableOpacity style={styles.dropdownTrigger}>
            <Text style={styles.dropdownText}>Select type</Text>
            <Text style={styles.dropdownArrow}>⌃</Text> 
          </TouchableOpacity>
        </View>

        {/* Start Date Picker placeholder */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Start date</Text>
          <View style={styles.inputWithIconContainer}>
            <TextInput 
              style={styles.inputWithIcon} 
              placeholder="dd/mm/yyyy" 
              placeholderTextColor="#A3A3A3"
              value={startDate}
              onChangeText={setStartDate}
            />
            <Calendar color="#737373" size={20} style={styles.inputIcon} />
          </View>
        </View>

        {/* End Date Picker placeholder */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>End date</Text>
          <View style={styles.inputWithIconContainer}>
            <TextInput 
              style={styles.inputWithIcon} 
              placeholder="dd/mm/yyyy" 
              placeholderTextColor="#A3A3A3"
              value={endDate}
              onChangeText={setEndDate}
            />
            <Calendar color="#737373" size={20} style={styles.inputIcon} />
          </View>
        </View>

        {/* Reason Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Reason</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="Add a reason (optional)" 
            placeholderTextColor="#A3A3A3"
            multiline={true}
            numberOfLines={3}
            value={reason}
            onChangeText={setReason}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 24,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  progressRingOuter: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    backgroundColor: '#000000', // Represents the majority (Remaining: 12 days)
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  progressRingBlueSegment: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 58, // 👈 Reduced from 72.5 to simulate a true smaller 40% slice (8 days used)
    height: 145,
    backgroundColor: '#3B82F6',
  },
  progressRingInner: {
    width: 115,
    height: 115,
    borderRadius: 57.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  daysNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  daysLabel: {
    fontSize: 11,
    color: '#737373',
    textAlign: 'center',
    marginTop: 2,
  },
  legendContainer: {
    justifyContent: 'center',
    gap: 14,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#737373',
    width: 80,
  },
  legendValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#A3A3A3',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#737373',
    transform: [{ rotate: '180deg' }],
  },
  inputWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
  },
  inputIcon: {
    marginLeft: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#000000',
    height: 100,
    textAlignVertical: 'top',
  },
});