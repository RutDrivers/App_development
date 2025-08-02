import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState('Rides');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* <Text style={styles.time}>10:09 <Text style={{fontSize:18}}>🟦</Text></Text> */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, tab==='Rides' && styles.tabActive]} onPress={()=>setTab('Rides')}>
            <Text style={[styles.tabIcon, tab==='Rides' && styles.tabIconActive]}>🚗</Text>
            <Text style={[styles.tabText, tab==='Rides' && styles.tabTextActive]}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab==='Planear' && styles.tabActive]} onPress={()=>setTab('Planear')}>
            <Text style={[styles.tabIcon, tab==='Planear' && styles.tabIconActive]}>🗓️</Text>
            <Text style={[styles.tabText, tab==='Planear' && styles.tabTextActive]}>Planear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{paddingBottom:32}}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder="Where to?" placeholderTextColor="#b0b0b0"/>
          {tab === 'Planear' && (
            <TouchableOpacity style={styles.laterBtn}><Text style={styles.laterText}>Planear</Text></TouchableOpacity>
          )}
          {tab === 'Rides' && (
            <TouchableOpacity style={styles.laterBtn}><Text style={styles.laterText}>Ahora</Text></TouchableOpacity>
          )}
        </View>
        {/* Suggestions (solo para Ride) */}
        {tab === 'Rides' && (
          <>
            <View style={styles.suggestionBox}>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionIcon}>✈️</Text>
                <View>
                  <Text style={styles.suggestionTitle}>Fort Lauderdale–Hollywood International Airport (FLL)</Text>
                  <Text style={styles.suggestionSubtitle}>100 Terminal Dr, Fort Lauderdale, FL</Text>
                </View>
              </View>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionIcon}>🅿️</Text>
                <View>
                  <Text style={styles.suggestionTitle}>Florida Fine Cars</Text>
                  <Text style={styles.suggestionSubtitle}><Text style={{color:'#22c55e'}}>Lower</Text> prices than usual</Text>
                </View>
              </View>
            </View>
            {/* Shortcuts */}
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Suggestions</Text>
              <TouchableOpacity><Text style={styles.sectionSeeAll}>See all</Text></TouchableOpacity>
            </View>
            <View style={styles.shortcutsGrid}>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>🚗</Text><Text style={styles.shortcutText}>Ride</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>🥗</Text><Text style={styles.shortcutText}>Food</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>🧑‍💼</Text><Text style={styles.shortcutText}>Courier</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>🛒</Text><Text style={styles.shortcutText}>Grocery</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutPromo}>Promo</Text><Text style={styles.shortcutIcon}>🔑</Text><Text style={styles.shortcutText}>Rental Cars</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>💐</Text><Text style={styles.shortcutText}>Flowers</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>📚</Text><Text style={styles.shortcutText}>Retail</Text></View>
              <View style={styles.shortcut}><Text style={styles.shortcutIcon}>💊</Text><Text style={styles.shortcutText}>Health</Text></View>
            </View>
          </>
        )}
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.bottomNavIcon}>🚗</Text>
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Trip')}>
          <Text style={styles.bottomNavIcon}>🔲</Text>
          <Text style={styles.bottomNavText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.bottomNavIcon}>📋</Text>
          <Text style={styles.bottomNavText}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.bottomNavIcon}>👤</Text>
          <Text style={styles.bottomNavText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  header: {
    backgroundColor: '#18181b',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  time: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 8,
  },
  tabActive: {
    borderBottomColor: '#fff',
  },
  tabIcon: {
    fontSize: 22,
    marginRight: 6,
    color: '#a3a3a3',
  },
  tabIconActive: {
    color: '#fff',
  },
  tabText: {
    fontSize: 18,
    color: '#a3a3a3',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
  scroll: {
    backgroundColor: '#18181b',
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232326',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  laterBtn: {
    backgroundColor: '#232326',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#35353a',
  },
  laterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  suggestionBox: {
    backgroundColor: '#232326',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  suggestionIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  suggestionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionSubtitle: {
    color: '#a3a3a3',
    fontSize: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSeeAll: {
    color: '#a3a3a3',
    fontSize: 15,
    fontWeight: 'bold',
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  shortcut: {
    width: '23%',
    backgroundColor: '#232326',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    position: 'relative',
  },
  shortcutIcon: {
    fontSize: 28,
    marginBottom: 6,
    color: '#fff',
  },
  shortcutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shortcutPromo: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    zIndex: 2,
  },
  eatsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  eatsSubtitle: {
    color: '#a3a3a3',
    fontSize: 15,
    marginBottom: 10,
  },
  eatsPromoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  eatsPromoCard: {
    width: '48%',
    height: 90,
    backgroundColor: '#232326',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eatsPromoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#232326',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#232326',
  },
  bottomNavItem: {
    alignItems: 'center',
    flex: 1,
  },
  bottomNavIcon: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 2,
  },
  bottomNavText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
//
