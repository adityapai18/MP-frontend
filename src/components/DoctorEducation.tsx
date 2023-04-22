import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';

const DoctorEducation = (prop: {
  education?: {
    md?: string;
    mbbs?: string;
  };
}) => {
  return (
    <View style={{padding: 15}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#24A4DE',
            borderRadius: 3,
          }}>
          <FontAwesome name="graduation-cap" size={19} color="white" />
        </View>
        <Text
          style={[
            styles.text,
            {fontSize: 16, marginLeft: 10, alignSelf: 'flex-end'},
          ]}>
          Education
        </Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>B.D.S</Text>
        <Text style={[styles.text, {color: '#9A9FB2'}]}>
          {prop.education?.mbbs}
        </Text>
        <Text style={[styles.text, {fontWeight: 'bold', marginTop: 10}]}>
          M.D
        </Text>
        <Text style={[styles.text, {color: '#9A9FB2'}]}>
          {prop.education?.md}
        </Text>
      </View>
    </View>
  );
};

export default DoctorEducation;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
