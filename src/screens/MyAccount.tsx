import {
  Image,
  Linking,
  // Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../constants/theme';
import {useAppContext} from '../lib/Context';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Divider} from 'react-native-paper';
import { MaterialCommunityIcons , Octicons , SimpleLineIcons, Feather , AntDesign  } from "@expo/vector-icons";

const MyAccount = ({navigation}: any) => {
  const auth = useAppContext();
  const [Token, setToken] = useState('');
  // messaging().getToken().then(setToken);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, {textAlign: 'center', fontSize: 25}]}>
        {auth?.user.name}
        </Text>
        <Text
          style={[
            styles.text,
            {textAlign: 'center', fontSize: 16, marginTop: 10},
          ]}>
          {auth?.user.email}
        </Text>


        {/* <Text
          style={[
            styles.text,
            {textAlign: 'center', fontSize: 16, color: COLORS.gray},
          ]}>
          {auth?.user.phoneNumber}
        </Text> */}
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Octicons name="history" size={32} color="black" />
            <Text style={[styles.text, {fontSize: 16, marginLeft: 15}]}>
              Your history
            </Text>
          </TouchableOpacity>
          <Divider style={{backgroundColor: COLORS.lightgray, marginTop: 15}} />
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}
            onPress={()=>Linking.openURL('https://www.doctrue.in/privacy_policy')}
            >
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={32}
              color="black"
            />
            <Text style={[styles.text, {fontSize: 16, marginLeft: 15}]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          {/* <Divider style={{backgroundColor: COLORS.lightgray, marginTop: 15}} />
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:+91 99999 00000`)}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Feather name="phone-call" size={32} color="black" />
            <Text style={[styles.text, {fontSize: 16, marginLeft: 15}]}>
              Call Us
            </Text>
          </TouchableOpacity> */}
          <Divider style={{backgroundColor: COLORS.lightgray, marginTop: 15}} />
          <TouchableOpacity
            onPress={() => {
              auth?.signout();
            }}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Feather name="log-out" size={32} color="black" />
            <Text style={[styles.text, {fontSize: 16, marginLeft: 15}]}>
              Log Out
            </Text>
          </TouchableOpacity>
          <Divider style={{backgroundColor: COLORS.lightgray, marginTop: 15}} />

          {/* <Text
            style={[styles.text, {fontSize: 16, marginLeft: 15}]}
            selectable>
            {Token}
          </Text> */}

          {/* <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={24}
            color="black"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="history" size={24} color="black" />
        </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: COLORS.offWhite,
    flex: 1,
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
  editButton: {
    backgroundColor: '#453F3F',
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
});
