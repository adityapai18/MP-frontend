import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';
import Feather from 'react-native-vector-icons/Feather';

const DoctorAboutMe = (prop:{bio?:string}) => {
  return (
    <View style={{padding: 15}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#24A4DE',
            borderRadius: 3,
          }}>
          <Feather name="info" size={24} color="white" />
        </View>
        <Text
          style={[
            styles.text,
            {fontSize: 16, marginLeft: 10, alignSelf: 'flex-end'},
          ]}>
          About Me
        </Text>
      </View>
      <View style={{padding: 5, marginTop: 5}}>
        <Text style={[styles.text, {color: '#9A9FB2'}]}>
          {prop.bio}
        </Text>
      </View>
    </View>
  );
};

export default DoctorAboutMe;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
