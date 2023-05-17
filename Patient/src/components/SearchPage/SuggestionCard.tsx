import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
interface suggestion {
  type: 'doctor' | 'clinic' | 'specialization';
  docData?: {
    name: string;
    loc: string;
    clinicName: string;
    image: ImageSourcePropType;
    experience: number;
  };
  clinicData?: {
    speciality: string;
    image: ImageSourcePropType;
  };
}
const SuggestionCard = ({type, docData, clinicData}: suggestion) => {
  if (type === 'doctor' && docData)
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Image
          style={{width: 60, height: 60, resizeMode: 'contain'}}
          source={docData.image}
        />
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <View>
            <Text style={styles.text}>{docData.name}</Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, color: COLORS.gray, lineHeight: 13},
              ]}>
              {docData.clinicName}
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, color: COLORS.gray, lineHeight: 13},
              ]}>
              {docData.loc}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {docData.experience > 5 ? (
              <Image source={require('../../assets/Experience.png')}></Image>
            ) : (
              <></>
            )}
            <Text style={[styles.text, {fontSize: 10, alignSelf: 'flex-end'}]}>
              {docData.experience} years
            </Text>
          </View>
        </View>
      </View>
    );
  if (type === 'clinic' && clinicData)
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: '#CCCCCC',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={clinicData.image} />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.text}>{clinicData.speciality}</Text>
          <Text
            style={[
              styles.text,
              {fontSize: 12, color: COLORS.gray, lineHeight: 13},
            ]}>
            Specialisation
          </Text>
        </View>
      </View>
    );
  return <></>;
};

export default SuggestionCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
