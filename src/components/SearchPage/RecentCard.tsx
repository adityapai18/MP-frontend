import {StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import React from 'react';
import { FONTS } from '../../constants/theme';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
interface recentSearchCard {
  searchValue: string;
  onRecentPressed:React.Dispatch<React.SetStateAction<string>>
}
const RecentCard = ({searchValue,onRecentPressed}: recentSearchCard) => {
  return (
    <TouchableOpacity onPress={()=>{onRecentPressed(searchValue)}} style={styles.container}>
      <MaterialIcons name="history" size={24} color="#979C9E" />
      <Text style={styles.text}>{searchValue}</Text>
    </TouchableOpacity>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#979C9E",
    marginLeft: 5,
  },
  container:{
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#979C9E",
    paddingVertical: 3,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  }
});
