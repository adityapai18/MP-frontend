import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
interface navBar {
  title: string;
}
const TopNavBar = ({title}: navBar) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <Ionicons
        name="arrow-back-outline"
        size={25}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={{width:25,height:25}}></View>
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
    fontSize: 24,
  },
});
