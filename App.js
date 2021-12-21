import React,{useRef, useMemo, useState, useEffect} from 'react';
import { StyleSheet, Text, View,FlatList, SafeAreaView } from 'react-native';
import List_Items from './Components/List_Items';

// import {SAMPLE_DATA} from "./assets/data/sampleData";
import { getMarketData } from './services/CryptoServices';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Charts from './Components/Charts';


const ListHeader = () => (
  <>
  <View style={styles.TitleWrapper}>     
  <Text style={styles.largeTitle}>Cryptos</Text>
  </View>
  <View style={styles.Line} />
  </>  
)
  
export default function App() {

  // using a useState Hook
  const [data, setData] = useState('');

  // using a useEffect Hook
    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setData(marketData);
      }

      fetchMarketData();
    }, [])

  // using a useState Hook
  const [selectedCoinData, setSelectedCoinData] = useState('');
   
  // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['43%'], []);

    // to open a Bottom Nav
     const OpenBottomNav = (item) => {
       setSelectedCoinData(item);
      bottomSheetModalRef.current?.present();
     }  

  return (
     <BottomSheetModalProvider>
   <View style={styles.container}>

      <FlatList 
         keyExtractor={(item) => item.id }
         data={data}
         renderItem={ ({item}) => ( 
          
          <List_Items 
        name={item.name}
        symbol={item.symbol}
        currentPrice={item.current_price}
        PriceChangePercentage7d={item.price_change_percentage_7d_in_currency}
        logoUrl={item.image}
        onPress={ () => OpenBottomNav(item)}
           />

          )}
          ListHeaderComponent={<ListHeader />}
      />
    </View> 

    <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.BottomSheet}
        >
          { selectedCoinData ? (

          <Charts
           name={selectedCoinData.name}
           symbol={selectedCoinData.symbol}
           logoUrl={selectedCoinData.image}
           currentPrice={selectedCoinData.current_price}
           PriceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
           sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
          ) : null }

        </BottomSheetModal>

    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  largeTitle : {
   fontSize: 24,
   fontWeight:'bold',
   textAlign: "center",
   textTransform: 'uppercase',
   color: '#000',
  },
  TitleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  Line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  BottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
