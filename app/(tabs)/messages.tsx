import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data copied directly from your Figma image text
const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Company Town hall',
    description: 'Join us for the monthly town hall meeting on Friday, Oct 2nd, at 10:00 AM.',
    date: 'Sep 18, 2026',
  },
  {
    id: '2',
    title: 'New Leave Policy',
    description: 'The new leave policy is now live. please review the updated guidelines.',
    date: 'Sep 12, 2026',
  },
  {
    id: '3',
    title: 'System maintenance',
    description: 'The platform will be under maintenance on Sep 12, 2026 from 12AM to 4AM',
    date: 'Aug 9, 2026',
  },
];

export default function AnnouncementsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Row */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          {/* Custom Left Arrow SVG */}
          <View style={styles.arrowIcon}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowLeftTip} />
          </View>
        </TouchableOpacity>
        {/* Spelling matched to Figma design typo: "Announcments" */}
        <Text style={styles.headerTitle}>Announcments</Text>
      </View>

      {/* Main Content List */}
      <ScrollView 
        style={styles.listContainer} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {ANNOUNCEMENTS.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Card Top Section: Icon, Title, and Action Options */}
            <View style={styles.cardTopRow}>
              <View style={styles.titleGroup}>
                <View style={styles.iconContainer}>
                  {/* Custom Minimalist Bell SVG */}
                  <View style={styles.bellIcon}>
                    <View style={styles.bellTop} />
                    <View style={styles.bellBottom} />
                    <View style={styles.bellDot} />
                  </View>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              
              {/* Three Vertical Dots Menu Button */}
              <TouchableOpacity style={styles.moreButton} activeOpacity={0.6}>
                <View style={styles.dot} />
                <View style={[styles.dot, { marginVertical: 3 }]} />
                <View style={styles.dot} />
              </TouchableOpacity>
            </View>

            {/* Description Text */}
            <Text style={styles.cardDescription}>{item.description}</Text>

            {/* Timestamp */}
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    // Soft drop shadow to mirror cards
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  cardDescription: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
    paddingLeft: 44, // Perfectly aligns text right under the title block
    marginBottom: 20,
  },
  cardDate: {
    fontSize: 12,
    color: '#9ca3af',
    paddingLeft: 44,
    fontWeight: '500',
  },
  moreButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#9ca3af',
  },
  // Structural fallback vectors for clean execution without installing asset deps
  arrowIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  arrowLine: {
    width: 18,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  arrowLeftTip: {
    position: 'absolute',
    left: 0,
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },
  bellIcon: {
    alignItems: 'center',
  },
  bellTop: {
    width: 14,
    height: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  bellBottom: {
    width: 18,
    height: 2,
    backgroundColor: '#2563eb',
    borderRadius: 1,
    marginTop: 1,
  },
  bellDot: {
    width: 4,
    height: 3,
    backgroundColor: '#2563eb',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: 1,
  },
});
