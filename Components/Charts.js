import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from "react-native-reanimated";

export const {width: SIZE} = Dimensions.get('window');

const Charts = ({ name, symbol, logoUrl, currentPrice,PriceChangePercentage7d, sparkline }) => {

  const latestCurrentPrice = useSharedValue(currentPrice)

   // uing a UseState Hook
 const [chartRedy, setchartRedy] = useState()

   // uing a UseEffect Hook
       useEffect(() => {
        latestCurrentPrice.value = currentPrice;
       
      setTimeout(() => {
           setchartRedy(true)
      }, 0);

      }, [currentPrice])

  //Using a Terenary Operator
   const priceChangeColor = PriceChangePercentage7d > 0 ? '#00e000': '#ff0000';

  const formatUSD = value => {
       'worklet';
       
   if (value === '') {
         return `$${latestCurrentPrice.value.toLocaleString("en-US", { currency: "USD" })}`;
       }
     
       const formattedValue =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
       return formattedValue;

  } 

  return (
    <ChartPathProvider data={{ points: sparkline , smoothingStrategy: 'bezier' }}>
    <View style={styles.container}>

      {/* Title    */}
      <View style={styles.TitleWrapper}>

        <View style={styles.UpperTitle}>
          {/* Left side title */}
          <View style={styles.UpperLeftTitle}>
          <Image style={styles.image} source={{ uri: logoUrl}} />
            <Text style={styles.subTitle}>
              {name} ({symbol.toUpperCase()})
            </Text>
          </View>
          {/* Right side data */}
          <Text style={styles.subTitle}> 7d</Text>
        </View>

        <View style={styles.LowerTitle}>
           

          {/* Left side title */}

          <ChartYLabel
              format={formatUSD} style={styles.BoldTitle} />

          {/* <Text style={styles.BoldTitle}> ${currentPrice.toLocaleString("en-US", { currency: "USD" })} </Text> */}

          {/* Right side data */}
          <Text style={[styles.Title , {color: priceChangeColor} ]}>
            {PriceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>

      </View>
      
      {  chartRedy ? 
          (<View style={styles.ChartLineWrapper}>
        <ChartPath height={SIZE / 2} stroke="#000" width={SIZE} />
        <ChartDot style={{ backgroundColor: 'red' }} />
          </View>)
          : null
      }  
      
    </View>
    </ChartPathProvider>
  );
};

export default Charts;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  TitleWrapper: {
    marginHorizontal: 16,
  },
  UpperTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 27,
    height: 27,
    marginRight: 4,
  },
  UpperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  LowerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BoldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Title: {
    fontSize: 18,
  },
  ChartLineWrapper: {
    marginTop: 15,
  },
})
