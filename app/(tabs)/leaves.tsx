import { myStyles } from "@/styles/main";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#407BFF";

const leaveBalance = {
  annualLeave: { total: 20, used: 5, remaining: 15 },
  sickLeave: { total: 10, used: 2, remaining: 8 },
  unpaidLeave: { total: 5, used: 1, remaining: 4 }
};

const initialHistory = [
  { id: "1", type: "Annual Leave", month: "October", dateRange: "Oct 12 - Oct 17", status: "Approved", days: 5, statusColor: "#52C41A" },
  { id: "2", type: "Sick Leave", month: "August", dateRange: "Aug 04 - Aug 06", status: "Approved", days: 2, statusColor: "#52C41A" },
  { id: "3", type: "Unpaid Leave", month: "September", dateRange: "Sep 28", status: "Pending", days: 1, statusColor: "#FAAD14" },
  { id: "4", type: "Annual Leave", month: "July", dateRange: "Jul 15 - Jul 18", status: "Rejected", days: 3, statusColor: "#FF4D4F" },
];

type LeaveCardProps = { type: string; remaining: number; total: number; color: string };

function LeaveBalanceCard({ type, remaining, total, color }: LeaveCardProps) {
  return (
    <View style={[myStyles.valueBox, { marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }} />
        <Text style={[myStyles.valueText, { fontWeight: '600' }]}>{type}</Text>
      </View>
      <Text style={[myStyles.label, { marginBottom: 0 }]}>
        <Text style={{ fontWeight: 'bold', color: '#4163d3' }}>{remaining}</Text> / {total} days left
      </Text>
    </View>
  );
}

export default function LeavesScreen() {
  const router = useRouter();
  const [history, setHistory] = useState(initialHistory);

  const handleNewRequest = () => {
    alert("Opening New Leave Request Form...");
  };

  return (
    <SafeAreaView style={myStyles.safe} edges={["top"]}>
      
      <View style={myStyles.header}>
        <View style={myStyles.headerSide} /> 
        <Text style={myStyles.headerTitle}>Leave Management</Text>
        <View style={[myStyles.headerSide, myStyles.headerRight]} />
      </View>

      <ScrollView
        contentContainerStyle={[myStyles.scrolll, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[myStyles.label, { marginTop: 10, marginBottom: 2, fontSize: 18, fontWeight: 'bold', color: '#111' }]}>
          Overview
        </Text>
        
       
        <Text style={{ fontSize: 14, color: '#666', fontWeight: '500', marginBottom: 14, paddingLeft: 4 }}>
          Leave Balance (Tunde)
        </Text>
        
        <LeaveBalanceCard type="Annual Leave" remaining={leaveBalance.annualLeave.remaining} total={leaveBalance.annualLeave.total} color="#407BFF" />
        <LeaveBalanceCard type="Sick Leave" remaining={leaveBalance.sickLeave.remaining} total={leaveBalance.sickLeave.total} color="#FF4D4F" />
        <LeaveBalanceCard type="Unpaid Leave" remaining={leaveBalance.unpaidLeave.remaining} total={leaveBalance.unpaidLeave.total} color="#D46B08" />

        {/* --- SECTION 2: NEW REQUEST BUTTON --- */}
        <Pressable
          onPress={handleNewRequest}
          style={{
            backgroundColor: PRIMARY,
            padding: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8
          }}
          accessibilityRole="button"
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>New Request</Text>
        </Pressable>

        <Text style={[myStyles.label, { marginBottom: 12, fontSize: 16, fontWeight: 'bold', color: '#333' }]}>
          Request History
        </Text>

        {history.map((item) => (
          <View 
            key={item.id} 
            style={{ 
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: 16,
              marginBottom: 14, 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2, 
            }}
          >
            <View style={{ gap: 4, flex: 1, paddingRight: 8 }}>
              <Text style={{ fontWeight: '700', fontSize: 15, color: '#111' }}>
                {item.type}
              </Text>
              
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#4163d3', marginBottom: 2 }}>
                {item.dateRange}
              </Text>

              <Text style={{ fontSize: 12, color: '#777' }}>
                Month: {item.month}  •  {item.days} {item.days === 1 ? 'day' : 'days'}
              </Text>
            </View>

            <View 
              style={{ 
                backgroundColor: item.statusColor + "15", 
                paddingVertical: 6, 
                paddingHorizontal: 12, 
                borderRadius: 20,
                borderWidth: 1,
                borderColor: item.statusColor + "30"
              }}
            >
              <Text style={{ color: item.statusColor, fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}