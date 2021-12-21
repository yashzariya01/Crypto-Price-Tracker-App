import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const List_Items = ({ name, symbol, currentPrice, PriceChangePercentage7d, logoUrl, onPress }) => {
  
  //Using a Terenary Operator
  const priceChangeColor = PriceChangePercentage7d > 0 ? '#00e000': '#ff0000';
  
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.Items}>
        
        {/* Left side */}
        <View style={styles.leftSide}>
          <Image style={styles.image} 
          source={{ uri: logoUrl}}
          />
          
          <View style={styles.TitleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* Right side */}
        <View style={styles.RightSide}>
        <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.subTitle, { color: priceChangeColor }]}>{PriceChangePercentage7d.toFixed(2)}%</Text>
        </View>
    
     </View>
    </TouchableOpacity>
  );
};

export default List_Items;

const styles = StyleSheet.create({
  Items: {
      paddingHorizontal: 17,
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  image: {
      height: 48,
      width: 48,
  },
  leftSide: {
      flexDirection: "row",
      alignItems: 'center',
  },
  TitleWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A9ABB1',
  },
  RightSide: {
    alignItems: 'flex-end',
  },

});
