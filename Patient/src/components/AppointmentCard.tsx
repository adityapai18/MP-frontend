import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { tConvert } from '../lib/helpers/func';

const AppointmentCard = (props: {
  date: string;
  name: string;
  speciality: string[];
  mc_timings:any
  clinic_name:string
  img_link:string
}) => {
  const timings = props.mc_timings[0].timings;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: COLORS.gray, alignSelf: 'flex-end'}]}>
        {props.date}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri:props.img_link}}
          style={{
            height: 55,
            width: 55,
            borderRadius: 55,
            resizeMode: 'contain',
          }}></Image>
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={[styles.text, {fontSize: 18, color: COLORS.dark}]}>
            Dr. {props.name}
          </Text>
          <Text style={[styles.text, {fontSize: 12, color: '#979C9E'}]}>
            {props.speciality.join(' , ')}
          </Text>
        </View>
      </View>
      <Divider
        style={{
          width: '95%',
          backgroundColor: 'rgba(204, 204, 204, 1)',
          marginTop: 10,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="ios-location-outline" size={28} color="black" />
          <Text
            style={[
              styles.text,
              {fontSize: 12, color: COLORS.dark, marginLeft: 7},
            ]}>
            {props.clinic_name}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <Image
            source={require('../assets/AppointmentDelayIcon.png')}
            style={{width: 28, height: 28, resizeMode: 'contain'}}></Image>
          <Text
            style={[
              styles.text,
              {fontSize: 12, color: COLORS.dark, marginLeft: 7},
            ]}>
            Delayed By 10 Mins
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Ionicons name="md-time-outline" size={24} color="black" />
          <Text
            style={[
              styles.text,
              {fontSize: 12, color: COLORS.dark, marginLeft: 7},
            ]}>
              {tConvert(timings[0])} to {tConvert(timings[1])}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={[
              styles.text,
              {fontWeight: '300', fontSize: 12, color: 'rgba(36, 164, 222, 1)'},
            ]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'rgba(36, 164, 222, 1)'}]}>
          <Text
            style={[
              styles.text,
              {fontWeight: '300', fontSize: 12, color: 'white'},
            ]}>
            Join Queue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    marginVertical: 20,
    padding: 25,
  },
  text: {
    fontFamily: FONTS.regular,
  },
  button: {
    borderRadius: 12,
    borderColor: 'rgba(36, 164, 222, 1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    flex: 0.45,
    marginTop: 5,
  },
});
