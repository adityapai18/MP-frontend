import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';
interface prop {
  name: string;
  pos: string;
  status: string;
}
const LiveQueuePersonCard = (props: prop) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[styles.text, {fontSize: 32, color: 'rgba(36, 164, 222, 1)'}]}>
          {props.pos}
        </Text>
      </View>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <Text style={[styles.text, {fontSize: 16, color: 'black'}]}>
          {props.name}
        </Text>
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
        <Text
          style={[styles.text, {fontSize: 14, color: 'rgba(36, 164, 222, 1)'}]}>
          {props.status}
        </Text>
      </View>
    </View>
  );
};

export default LiveQueuePersonCard;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '85%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop:10
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
