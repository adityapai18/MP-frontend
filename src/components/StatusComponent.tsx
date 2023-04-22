import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { FONTS, COLORS } from '../constants/theme';

const StatusComponent = (props:{text:string,image:ImageSourcePropType,value:string}) => {
  return (
    <View>
      <Text style={[styles.text, {margin: 10, marginRight: 0}]}>
        {props.text}
      </Text>
      <View
        style={{
          height: 60,
          marginVertical: 2,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <Image
          source={props.image}
          style={{marginLeft: 15}}></Image>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.text,
              {
                color: 'rgba(36, 164, 222, 1)',
                fontSize: 20,
                marginLeft: 10,
                textAlign:'center'
              },
            ]}>
            {props.value}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatusComponent;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
