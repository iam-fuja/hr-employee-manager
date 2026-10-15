// // import { AlertCircle, ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react-native';
// // import React, { useState } from 'react';
// // import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // export default function LeaveRequestScreen() {

// //   const [leaveType, setLeaveType] = useState('annual');
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [reason, setReason] = useState('');

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const API_URL = 'https://your-api-domain.com';
// //   const AUTH_TOKEN = 'YOUR_BEARER_TOKEN';
// //   const USER_ID = 'user_id_12345';
// //   const COMPANY_ID = 'TechCrush';

// //   const leaveOptions = [
// //     { label: 'Annual Leave', value: 'annual' },
// //     { label: 'Sick Leave', value: 'sick' },
// //     { label: 'Unpaid Leave', value: 'unpaid' }
// //   ];

// //   const calculateTotalDays = (startStr: string, endStr: string): number => {
// //     const sDate = new Date(startStr);
// //     const eDate = new Date(endStr);
// //     if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) return 1;

// //     const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
// //     return diffDays || 1;
// //   };

// //   // POST /api/leaves
// //   const handleSubmit = async () => {
// //     setSuccessMessage('');
// //     setErrorMessage('');

// //     if (!startDate || !endDate) {
// //       setErrorMessage('Please enter both a start and end date.');
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     const requestBody = {
// //       companyId: COMPANY_ID,
// //       employee: USER_ID,
// //       leaveType: leaveType,
// //       startDate: startDate,
// //       endDate: endDate,
// //       totalDays: calculateTotalDays(startDate, endDate),
// //       reason: reason || "Family vacation"
// //     };

// //     try {
// //       const response = await fetch(API_URL, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${AUTH_TOKEN}`,
// //         },
// //         body: JSON.stringify(requestBody),
// //       });

// //       const result = await response.json();

// //       if (response.ok && result.success) {
// //         setSuccessMessage( " Your leave request has been submitted successfully!");
// //         setStartDate('');
// //         setEndDate('');
// //         setReason('');
// //       } else {
// //         setErrorMessage(result.message || 'Failed to submit leave request.');
// //       }
// //     } catch (error) {

// //       console.log('Network connection error caught, forcing local success view:', error);

// //       setSuccessMessage(" Your leave request has been submitted successfully!");
// //       setStartDate('');
// //       setEndDate('');
// //       setReason('');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const currentLeaveLabel = leaveOptions.find(opt => opt.value === leaveType)?.label || 'Select Type';

// //   return (
// //     <SafeAreaView style={styles.container}>

// //       <View style={styles.header}>
// //         <TouchableOpacity style={styles.backButton}>
// //           <ArrowLeft color="#000" size={24} />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Leave request</Text>
// //       </View>

// //       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

// //         {!!successMessage && (
// //           <View style={[styles.banner, styles.successBanner]}>
// //             <CheckCircle2 color="#16A34A" size={20} style={styles.bannerIcon} />
// //             <Text style={styles.successText}>{successMessage}</Text>
// //           </View>
// //         )}

// //         {!!errorMessage && (
// //           <View style={[styles.banner, styles.errorBanner]}>
// //             <AlertCircle color="#DC2626" size={20} style={styles.bannerIcon} />
// //             <Text style={styles.errorText}>{errorMessage}</Text>
// //           </View>
// //         )}

// //         <View style={styles.balanceCard}>
// //           <View style={styles.cardHeaderRow}>
// //             <Calendar color="#000000" size={18} style={styles.cardHeaderIcon} />
// //             <Text style={styles.cardTitle}>Leave balance</Text>
// //           </View>
// //           <View style={styles.chartContainer}>
// //             <View style={styles.progressRingOuter}>
// //               <View style={styles.progressRingBlueSegment} />
// //               <View style={styles.progressRingInner}>
// //                 <Text style={styles.daysNumber}>12</Text>
// //                 <Text style={styles.daysLabel}>Days available</Text>
// //               </View>
// //             </View>

// //             <View style={styles.legendContainer}>
// //               <View style={styles.legendRow}>
// //                 <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
// //                 <Text style={styles.legendText}>Used</Text>
// //                 <Text style={styles.legendValue}>8 days</Text>
// //               </View>
// //               <View style={styles.legendRow}>
// //                 <View style={[styles.legendDot, { backgroundColor: '#000000' }]} />
// //                 <Text style={styles.legendText}>Remaining</Text>
// //                 <Text style={styles.legendValue}>12 days</Text>
// //               </View>
// //             </View>
// //           </View>
// //         </View>

// //         <Text style={styles.formSectionTitle}>Request leave</Text>

// //         <View style={[styles.inputGroup, { zIndex: 10 }]}>
// //           <Text style={styles.inputLabel}>Leave type</Text>

// //           <TouchableOpacity
// //             style={styles.dropdownTrigger}
// //             onPress={() => setIsDropdownOpen(!isDropdownOpen)}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.dropdownTextSelected}>{currentLeaveLabel}</Text>
// //             <Text style={[styles.dropdownArrow, isDropdownOpen && styles.dropdownArrowOpen]}>⌃</Text>
// //           </TouchableOpacity>

// //           {isDropdownOpen && (
// //             <View style={styles.dropdownMenu}>
// //               {leaveOptions.map((option) => (
// //                 <TouchableOpacity
// //                   key={option.value}
// //                   style={[
// //                     styles.dropdownOption,
// //                     leaveType === option.value && styles.dropdownOptionActive
// //                   ]}
// //                   onPress={() => {
// //                     setLeaveType(option.value);
// //                     setIsDropdownOpen(false);
// //                   }}
// //                 >
// //                   <Text style={[
// //                     styles.dropdownOptionText,
// //                     leaveType === option.value && styles.dropdownOptionTextActive
// //                   ]}>
// //                     {option.label}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           )}
// //         </View>

// //         <View style={styles.inputGroup}>
// //           <Text style={styles.inputLabel}>Start date</Text>
// //           <View style={styles.inputWithIconContainer}>
// //             <TextInput
// //               style={styles.inputWithIcon}
// //               placeholder="YYYY-MM-DD"
// //               placeholderTextColor="#A3A3A3"
// //               value={startDate}
// //               onChangeText={setStartDate}
// //             />
// //             <Calendar color="#737373" size={20} style={styles.inputIcon} />
// //           </View>
// //         </View>

// //         <View style={styles.inputGroup}>
// //           <Text style={styles.inputLabel}>End date</Text>
// //           <View style={styles.inputWithIconContainer}>
// //             <TextInput
// //               style={styles.inputWithIcon}
// //               placeholder="YYYY-MM-DD"
// //               placeholderTextColor="#A3A3A3"
// //               value={endDate}
// //               onChangeText={setEndDate}
// //             />
// //             <Calendar color="#737373" size={20} style={styles.inputIcon} />
// //           </View>
// //         </View>

// //         <View style={styles.inputGroup}>
// //           <Text style={styles.inputLabel}>Reason</Text>
// //           <TextInput
// //             style={styles.textArea}
// //             placeholder="Add a reason (optional)"
// //             placeholderTextColor="#A3A3A3"
// //             multiline={true}
// //             numberOfLines={3}
// //             value={reason}
// //             onChangeText={setReason}
// //           />
// //         </View>

// //         <TouchableOpacity
// //           style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
// //           onPress={handleSubmit}
// //           disabled={isSubmitting}
// //         >
// //           {isSubmitting ? (
// //             <ActivityIndicator color="#FFFFFF" />
// //           ) : (
// //             <Text style={styles.submitButtonText}>Submit Request</Text>
// //           )}
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F5F5F5',
// //   },
// //   backButton: {
// //     marginRight: 16,
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: '700',
// //     color: '#000000',
// //   },
// //   scrollContainer: {
// //     padding: 16,

// // paddingBottom: 40,
// // },
// // banner: {
// // flexDirection: 'row',
// // alignItems: 'center',
// // borderWidth: 1,
// // borderRadius: 12,
// // padding: 12,
// // marginBottom: 16,
// // },
// // successBanner: {
// // backgroundColor: '#DCFCE7',
// // borderColor: '#16A34A',
// // },
// // errorBanner: {
// // backgroundColor: '#FEE2E2',
// // borderColor: '#DC2626',
// // },
// // bannerIcon: {
// // marginRight: 8,
// // },
// // successText: {
// // color: '#15803D',
// // fontWeight: '600',
// // fontSize: 14,
// // flex: 1,
// // },
// // errorText: {
// // color: '#B91C1C',
// // fontWeight: '600',
// // fontSize: 14,
// // flex: 1,
// // },
// // balanceCard: {
// // backgroundColor: '#FFFFFF',
// // borderRadius: 16,
// // padding: 16,
// // borderWidth: 1,
// // borderColor: '#E5E5E5',
// // marginBottom: 24,
// // },
// // cardHeaderRow: {
// // flexDirection: 'row',
// // alignItems: 'center',
// // marginBottom: 16,
// // },
// // cardHeaderIcon: {
// // marginRight: 8,
// // },
// // cardTitle: {
// // fontSize: 14,
// // fontWeight: '600',
// // color: '#000000',
// // },
// // chartContainer: {
// // flexDirection: 'row',
// // alignItems: 'center',
// // justifyContent: 'space-between',
// // paddingHorizontal: 8,
// // },
// // progressRingOuter: {
// // width: 145,
// // height: 145,
// // borderRadius: 72.5,
// // backgroundColor: '#000000',
// // justifyContent: 'center',
// // alignItems: 'center',
// // position: 'relative',
// // overflow: 'hidden',
// // },
// // progressRingBlueSegment: {
// // position: 'absolute',
// // top: 0,
// // right: 0,
// // width: 58,
// // height: 145,
// // backgroundColor: '#3B82F6',
// // },
// // progressRingInner: {
// // width: 115,
// // height: 115,
// // borderRadius: 57.5,
// // backgroundColor: '#FFFFFF',
// // justifyContent: 'center',
// // alignItems: 'center',
// // zIndex: 2,
// // },
// // daysNumber: {
// // fontSize: 28,
// // fontWeight: '700',
// // color: '#000000',
// // },
// // daysLabel: {
// // fontSize: 11,
// // color: '#737373',
// // textAlign: 'center',
// // marginTop: 2,
// // },
// // legendContainer: {
// // justifyContent: 'center',
// // gap: 14,
// // },
// // legendRow: {
// // flexDirection: 'row',
// // alignItems: 'center',
// // },
// // legendDot: {
// // width: 10,
// // height: 10,
// // borderRadius: 5,
// // marginRight: 8,
// // },
// // legendText: {
// // fontSize: 13,
// // color: '#737373',
// // width: 80,
// // },
// // legendValue: {
// // fontSize: 13,
// // fontWeight: '600',
// // color: '#000000',
// // },
// // formSectionTitle: {
// // fontSize: 16,
// // fontWeight: '700',
// // color: '#000000',
// // marginBottom: 16,
// // },
// // inputGroup: {
// // marginBottom: 16,
// // position: 'relative',
// // },
// // inputLabel: {
// // fontSize: 14,
// // fontWeight: '500',
// // color: '#000000',
// // marginBottom: 8,
// // },
// // dropdownTrigger: {
// // flexDirection: 'row',
// // justifyContent: 'space-between',
// // alignItems: 'center',
// // borderWidth: 1,
// // borderColor: '#E5E5E5',
// // borderRadius: 20,
// // paddingHorizontal: 16,
// // paddingVertical: 12,
// // backgroundColor: '#FFFFFF',
// // },
// // dropdownTextSelected: {
// // fontSize: 14,
// // color: '#000000',
// // fontWeight: '500',
// // },
// // dropdownArrow: {
// // fontSize: 12,
// // color: '#737373',
// // transform: [{ rotate: '180deg' }],
// // },
// // dropdownArrowOpen: {
// // transform: [{ rotate: '0deg' }],
// // },
// // dropdownMenu: {
// // position: 'absolute',
// // top: 74,
// // left: 0,
// // right: 0,
// // backgroundColor: '#FFFFFF',
// // borderWidth: 1,
// // borderColor: '#E5E5E5',
// // borderRadius: 16,
// // marginTop: 4,
// // paddingVertical: 4,
// // shadowColor: '#000000',
// // shadowOffset: { width: 0, height: 2 },
// // shadowOpacity: 0.05,
// // shadowRadius: 8,
// // elevation: 3,
// // },
// // dropdownOption: {
// // paddingHorizontal: 16,
// // paddingVertical: 12,
// // },
// // dropdownOptionActive: {
// // backgroundColor: '#F5F5F5',
// // },
// // dropdownOptionText: {
// // fontSize: 14,
// // color: '#737373',
// // },
// // dropdownOptionTextActive: {
// // color: '#000000',
// // fontWeight: '600',
// // },
// // inputWithIconContainer: {
// // flexDirection: 'row',
// // alignItems: 'center',
// // borderWidth: 1,
// // borderColor: '#E5E5E5',
// // borderRadius: 20,
// // backgroundColor: '#FFFFFF',
// // paddingHorizontal: 16,
// // },
// // inputWithIcon: {
// // flex: 1,
// // paddingVertical: 12,
// // fontSize: 14,
// // color: '#000000',
// // },
// // inputIcon: {
// // marginLeft: 8,
// // },
// // textArea: {
// // borderWidth: 1,
// // borderColor: '#E5E5E5',
// // borderRadius: 20,
// // paddingHorizontal: 16,
// // paddingVertical: 12,
// // backgroundColor: '#FFFFFF',
// // fontSize: 14,
// // color: '#000000',
// // height: 100,
// // textAlignVertical: 'top',
// // },
// // submitButton: {
// // backgroundColor: '#3B82F6',
// // borderRadius: 20,
// // paddingVertical: 14,
// // alignItems: 'center',
// // marginTop: 8,
// // marginBottom: 24,
// // },
// // submitButtonDisabled: {
// // backgroundColor: '#A3A3A3',
// // },
// // submitButtonText: {
// // color: '#FFFFFF',
// // fontSize: 16,
// // fontWeight: '600',
// // },
// // });

// import { AlertCircle, ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface LeaveHistoryItem {
//   leaveType: string;
//   startDate: string;
//   endDate: string;
//   totalDays: number;
//   reason: string;
//   status: string;
// }

// interface ApiResponse {
//   success: boolean;
//   message?: string;
//   data?: LeaveHistoryItem[];
// }

// export default function LeaveRequestScreen() {

//   const [leaveType, setLeaveType] = useState<string>('annual');
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [reason, setReason] = useState<string>('');

//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   const [usedDays, setUsedDays] = useState<number>(0);
//   const [remainingDays, setRemainingDays] = useState<number>(12);

//   const API_URL: string = 'https://your-api-domain.com';
//   const AUTH_TOKEN: string = 'YOUR_BEARER_TOKEN';
//   const USER_ID: string = 'user_id_12345';
//   const COMPANY_ID: string = 'TechCrush';

//   const leaveOptions = [
//     { label: 'Annual Leave', value: 'annual' },
//     { label: 'Sick Leave', value: 'sick' },
//     { label: 'Unpaid Leave', value: 'unpaid' }
//   ];

//   useEffect(() => {
//     calculateDynamicBalances();
//   }, []);

//   const calculateDynamicBalances = async (): Promise<void> => {
//     try {
//       const response = await fetch(`${API_URL}/api/leaves`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${AUTH_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const result = (await response.json()) as ApiResponse;

//       if (response.ok && result.success && result.data) {
//         const historyList: LeaveHistoryItem[] = result.data;

//         let totalUsed = 0;
//         historyList.forEach((item: LeaveHistoryItem) => {
//           totalUsed += Number(item.totalDays) || 0;
//         });

//         const totalAllotmentBase = 20;
//         setUsedDays(totalUsed);
//         setRemainingDays(totalAllotmentBase - totalUsed);
//       }
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : 'Unknown balance error';
//       console.log('Error calculating leave dynamic numbers:', message);
//     }
//   };

//   const calculateTotalDays = (startStr: string, endStr: string): number => {
//     const sDate = new Date(startStr);
//     const eDate = new Date(endStr);
//     if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) return 1;

//     const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays || 1;
//   };

//   const handleSubmit = async (): Promise<void> => {
//     setSuccessMessage('');
//     setErrorMessage('');

//     if (!startDate || !endDate) {
//       setErrorMessage('Please enter both a start and end date.');
//       return;
//     }

//     setIsSubmitting(true);

//     const requestBody = {
//       companyId: COMPANY_ID,
//       employee: USER_ID,
//       leaveType: leaveType,
//       startDate: startDate,
//       endDate: endDate,
//       totalDays: calculateTotalDays(startDate, endDate),
//       reason: reason || "Family vacation"
//     };

//     try {
//       const response = await fetch(`${API_URL}/api/leaves`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${AUTH_TOKEN}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const result = (await response.json()) as ApiResponse;

//       if (response.ok && result.success) {
//         setSuccessMessage("Your leave request has been submitted successfully!");
//         setStartDate('');
//         setEndDate('');
//         setReason('');
//         calculateDynamicBalances();
//       } else {
//         setErrorMessage(result.message || 'Failed to submit leave request.');
//       }
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : 'Unknown network error';
//       console.log('Network connection error caught:', message);
//       setErrorMessage('Network error submitting request.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const currentLeaveLabel: string = leaveOptions.find(opt => opt.value === leaveType)?.label || 'Select Type';

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}>
//           <ArrowLeft stroke="#000" size={24} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Leave request</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         {!!successMessage && (
//           <View style={[styles.banner, styles.successBanner]}>
//             <CheckCircle2 stroke="#16A34A" size={20} style={styles.bannerIcon} />
//             <Text style={styles.successText}>{successMessage}</Text>
//           </View>
//         )}

//         {!!errorMessage && (
//           <View style={[styles.banner, styles.errorBanner]}>
//             <AlertCircle stroke="#DC2626" size={20} style={styles.bannerIcon} />
//             <Text style={styles.errorText}>{errorMessage}</Text>
//           </View>
//         )}

//         <View style={styles.balanceCard}>
//           <View style={styles.cardHeaderRow}>
//             <Calendar stroke="#000000" size={18} style={styles.cardHeaderIcon} />
//             <Text style={styles.cardTitle}>Leave balance</Text>
//           </View>
//           <View style={styles.chartContainer}>
//             <View style={styles.progressRingOuter}>
//               <View style={styles.progressRingBlueSegment} />
//               <View style={styles.progressRingInner}>
//                 <Text style={styles.daysNumber}>{remainingDays}</Text>
//                 <Text style={styles.daysLabel}>Days available</Text>
//               </View>
//             </View>

//             <View style={styles.legendContainer}>
//               <View style={styles.legendRow}>
//                 <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
//                 <Text style={styles.legendText}>Used</Text>
//                 <Text style={styles.legendValue}>{usedDays} days</Text>
//               </View>
//               <View style={styles.legendRow}>
//                 <View style={[styles.legendDot, { backgroundColor: '#000000' }]} />
//                 <Text style={styles.legendText}>Remaining</Text>
//                 <Text style={styles.legendValue}>{remainingDays} days</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <Text style={styles.formSectionTitle}>Request leave</Text>

//         <View style={[styles.inputGroup, { zIndex: 10 }]}>
//           <Text style={styles.inputLabel}>Leave type</Text>
//           <TouchableOpacity
//             style={styles.dropdownTrigger}
//             onPress={() => setIsDropdownOpen(!isDropdownOpen)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.dropdownTextSelected}>{currentLeaveLabel}</Text>
//             <Text style={[styles.dropdownArrow, isDropdownOpen && styles.dropdownArrowOpen]}>⌃</Text>
//           </TouchableOpacity>

//           {isDropdownOpen && (
//             <View style={styles.dropdownMenu}>
//               {leaveOptions.map((option) => (
//                 <TouchableOpacity
//                   key={option.value}
//                   style={[
//                     styles.dropdownOption,
//                     leaveType === option.value && styles.dropdownOptionActive
//                   ]}
//                   onPress={() => {
//                     setLeaveType(option.value);
//                     setIsDropdownOpen(false);
//                   }}
//                 >
//                   <Text style={[
//                     styles.dropdownOptionText,
//                     leaveType === option.value && styles.dropdownOptionTextActive
//                   ]}>
//                     {option.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.inputLabel}>Start date</Text>
//           <View style={styles.inputWithIconContainer}>
//             <TextInput
//               style={styles.inputWithIcon}
//               placeholder="YYYY-MM-DD"
//               placeholderTextColor="#A3A3A3"
//               value={startDate}
//               onChangeText={setStartDate}
//             />
//             <Calendar stroke="#737373" size={20} style={styles.inputIcon} />
//           </View>
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.inputLabel}>End date</Text>
//           <View style={styles.inputWithIconContainer}>
//             <TextInput
//               style={styles.inputWithIcon}
//               placeholder="YYYY-MM-DD"
//               placeholderTextColor="#A3A3A3"
//               value={endDate}
//               onChangeText={setEndDate}
//             />
//             <Calendar stroke="#737373" size={20} style={styles.inputIcon} />
//           </View>
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.inputLabel}>Reason</Text>
//           <TextInput
//             style={styles.textArea}
//             placeholder="Add a reason (optional)"
//             placeholderTextColor="#A3A3A3"
//             multiline={true}
//             value={reason}
//             onChangeText={setReason}
//             textAlignVertical="top"
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.submitButton, isSubmitting && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <ActivityIndicator color="#FFF" size="small" />
//           ) : (
//             <Text style={styles.submitButtonText}>Submit Request</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   balanceCard: {
//     backgroundColor: '#FFF',
//     borderBottomColor: '#F0F0F0',
//     borderRadius: 12,
//     borderWidth: 1,
//     elevation: 1,
//     marginBottom: 24,
//     padding: 16,
//   },
//   banner: {
//     alignItems: 'center',
//     borderRadius: 8,
//     flexDirection: 'row',
//     marginBottom: 16,
//     padding: 12,
//   },
//   bannerIcon: {
//     marginRight: 8,
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   cardHeaderIcon: {
//     marginRight: 6,
//   },
//   cardHeaderRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   cardTitle: {
//     color: '#737373',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   chartContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   container: {
//     backgroundColor: '#FAFAFA',
//     flex: 1,
//   },
//   daysLabel: {
//     color: '#A3A3A3',
//     fontSize: 10,
//   },
//   daysNumber: {
//     color: '#000',
//     fontSize: 22,
//     fontWeight: '800',
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   dropdownArrow: {
//     color: '#737373',
//     fontSize: 16,
//   },
//   dropdownArrowOpen: {
//     transform: [
//       {
//         rotate: '180deg',
//       },
//     ],
//   },
//   dropdownMenu: {
//     backgroundColor: '#FFF',
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     borderWidth: 1,
//     marginTop: 4,
//     paddingVertical: 4,
//   },
//   dropdownOption: {
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   dropdownOptionActive: {
//     backgroundColor: '#EFF6FF',
//   },
//   dropdownOptionText: {
//     color: '#404040',
//     fontSize: 14,
//   },
//   dropdownOptionTextActive: {
//     color: '#2563EB',
//     fontWeight: '600',
//   },
//   dropdownTrigger: {
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     borderWidth: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//   },
//   dropdownTextSelected: {
//     color: '#000',
//     flex: 1,
//     fontSize: 14,
//   },
//   errorBanner: {
//     backgroundColor: '#FEE2E2',
//   },
//   errorText: {
//     color: '#B91C1C',
//     flex: 1,
//     fontWeight: '500',
//   },
//   formSectionTitle: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 16,
//     marginTop: 8,
//   },
//   header: {
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderBottomColor: '#F5F5F5',
//     borderBottomWidth: 1,
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   headerTitle: {
//     color: '#000',
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputIcon: {
//     marginLeft: 8,
//   },
//   inputLabel: {
//     color: '#404040',
//     fontSize: 13,
//     fontWeight: '600',
//     marginBottom: 6,
//   },
//   inputWithIcon: {
//     color: '#000',
//     flex: 1,
//     fontSize: 14,
//     paddingVertical: 12,
//   },
//   inputWithIconContainer: {
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     borderWidth: 1,
//     flexDirection: 'row',
//     paddingHorizontal: 12,
//   },
//   legendContainer: {
//     gap: 12,
//   },
//   legendDot: {
//     borderRadius: 5,
//     height: 10,
//     marginRight: 8,
//     width: 10,
//   },
//   legendRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   legendText: {
//     color: '#737373',
//     fontSize: 12,
//     width: 70,
//   },
//   legendValue: {
//     color: '#000',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   progressRingBlueSegment: {
//     borderColor: '#3B82F6',
//     borderLeftColor: 'transparent',
//     borderRadius: 50,
//     borderTopColor: 'transparent',
//     borderWidth: 6,
//     height: 100,
//     position: 'absolute',
//     width: 100,
//   },
//   progressRingInner: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressRingOuter: {
//     alignItems: 'center',
//     borderColor: '#E5E5E5',
//     borderRadius: 50,
//     borderWidth: 6,
//     height: 100,
//     justifyContent: 'center',
//     position: 'relative',
//     width: 100,
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   submitButton: {
//     alignItems: 'center',
//     backgroundColor: '#3B82F6',
//     borderRadius: 8,
//     marginBottom: 24,
//     paddingVertical: 14,
//     marginTop: 8,
//   },
//   submitButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   successBanner: {
//     backgroundColor: '#DCFCE7',
//   },
//   successText: {
//     color: '#15803D',
//     flex: 1,
//     fontWeight: '500',
//   },
//   textArea: {
//     backgroundColor: '#FFF',
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     borderWidth: 1,
//     color: '#000',
//     fontSize: 14,
//     minHeight: 80,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//   },
// });

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
