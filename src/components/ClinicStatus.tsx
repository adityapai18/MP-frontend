import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';
import StatusComponent from './StatusComponent';

const ClinicStatus = () => {
  return (
    <View
      style={{
        padding: 5,
        borderRadius: 10,
        marginVertical: 15,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.5, paddingRight: 15 , borderRightColor:'grey', borderRightWidth:2}}>
          <StatusComponent
            text="Doctor delayed by"
            image={require('../../assets/DoctorSchedule.png')}
            value="9:45 AM"
          />
          <StatusComponent
            text="Patients travelling"
            image={require('../../assets/PatientsInQueue.png')}
            value="33"
          />
        </View>
        <View style={{flex: 0.5, paddingLeft: 15}}>
          <StatusComponent
            text="In clinic patients"
            image={require('../../assets/InPatients.png')}
            value="4"
          />
          <StatusComponent
            text="Bookings availability"
            image={require('../../assets/BookingAvailable.png')}
            value="NA"
          />
        </View>
      </View>
    </View>
  );
};

export default ClinicStatus;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
