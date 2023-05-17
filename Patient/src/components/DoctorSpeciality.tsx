import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS} from '../constants/theme';
interface specs {
  spec: string ;
  imageURL: string;
}
const DoctorSpeciality = (prop: specs) => {
  return (
    <TouchableOpacity style={{marginHorizontal:25}}>
      <Image
        source={{uri: prop.imageURL}}
        style={{
          height: 48,
          width: 48,
          borderRadius: 12,
          resizeMode: 'contain',
          alignSelf:'center',
          marginTop:10
        }}></Image>
      <Text style={[styles.text, {color: 'black', fontSize: 10,}]}>
        {prop.spec}
      </Text>
    </TouchableOpacity>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});
