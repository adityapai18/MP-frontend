import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    PermissionsAndroid,
    ScrollView,
    FlatList,
    ActivityIndicator,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {COLORS, FONTS} from '../constants/theme';
  import {useAppContext} from '../lib/Context';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import SearchBar from '../components/SearchBar';
  import Carousel from '../components/Carousel';
  import Geolocation from 'react-native-geolocation-service';
  import DoctorNearCard from '../components/DoctorNearCard';
  import {BottomSheet} from '../components/BottomSheet';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import LiveQueueOnGoing from '../components/LiveQueueOnGoing';
  import DoctorSpeciality from '../components/DoctorSpeciality';
  import {
    getNearDoc,
    getSpecialities,
    getSpecialityAndNearDoc,
  } from '../lib/api/doc';
  import {DocNearData} from '../lib/helpers/interfaces';
  
  interface nearDoc {
    firstName: string;
    lastName: string;
    image: string;
    id: string;
  }
  
  const Home = ({navigation}: any) => {
    const auth = useAppContext();
    const [Loading, setLoading] = useState(true);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [clicked, setClicked] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [DocSpec, setDocSpec] = useState<string[]>([]);
    const [NearDoc, setNearDoc] = useState<DocNearData[]>([]);
    const [ShowBottomSheet, setShowBottomSheet] = useState(false);
    const [LocationGiven, setLocationGiven] =
      useState<Geolocation.GeoCoordinates | null>(null);
    const onNearDocPress = (item: DocNearData) => {
      navigation.navigate('DocDetails', {
        data: item,
        currPosition: LocationGiven,
      });
    };
    const greeting = () => {
      const date = new Date();
      const currentTime = date.getHours();
      let greet = '';
      if (currentTime >= 4 && currentTime <= 12) {
        greet = 'Good Morning';
      } else if (currentTime > 12 && currentTime <= 18) {
        greet = 'Good Afternoon';
      } else {
        greet = 'Good Evening';
      }
      return greet;
    };
  
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocationGiven(position.coords);
          setLoading(true);
  
          getSpecialityAndNearDoc(
            position.coords.latitude,
            position.coords.longitude,
          )
            .then(val => {
              console.log(val);
              setLoading(false);
              setDocSpec(val.spec);
              setNearDoc(val.finalRes);
            })
            .catch(() => {
              setLoading(false);
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          // getLocation();
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    const reqPermission = () => {
      PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
        .then(value => {
          // console.log(value);
          if (value === 'granted') {
            // reqPermission();
            getLocation();
            navigation.getParent().setOptions({
              tabBarStyle: {
                display: 'flex',
                height: 65,
              },
            });
          }
          if (value === 'denied') {
            setTrigger(trigger + 1);
          }
        })
        .catch(err => console.log(err));
    };
    useEffect(() => {
      PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION').then(
        value => {
          console.log(value);
          if (!value) {
            setShowBottomSheet(true);
            navigation.getParent().setOptions({
              tabBarStyle: {
                display: 'none',
              },
            });
          } else {
            setShowBottomSheet(false);
            getLocation();
            navigation.getParent().setOptions({
              tabBarStyle: {
                display: 'flex',
                height: 65,
              },
            });
          }
        },
      );
    }, [, trigger]);
    return (
      <>
        <ScrollView>
          <SafeAreaView style={style.mainConatiner}>
            <View style={{marginBottom: 10}}>
              <View
                style={{
                  paddingHorizontal: 25,
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  position: 'relative',
                  marginBottom: 20,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image
                    source={{
                      uri: auth?.user. ? auth.user.photoURL : '',
                    }}
                    style={{
                      width: 39,
                      height: 39,
                      borderRadius: 78,
                    }}></Image>
                </TouchableOpacity>
  
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={28}
                  onPress={() => navigation.navigate('QrCodeScanner')}
                  color="black"
                />
              </View>
              <Image
                source={require('../assets/DoctrueLogo.png')}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: -25,
                  height: 95,
                  width: 95,
                }}></Image>
              <Text
                style={[
                  style.text,
                  {color: COLORS.dark, textAlign: 'center', marginVertical: 15},
                ]}>
                {greeting()}, {auth?.user.displayName}
              </Text>
              <SearchBar
                PlaceHolder={'Search doctors,clinics & hospitals'}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                onSearchBarPressed={() => navigation.navigate('SearchPage')}
                setClicked={setClicked}></SearchBar>
            </View>
            <Carousel />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[style.text, {color: 'black', fontSize: 18}]}>
                Our specialities
              </Text>
              <TouchableOpacity>
                <Text style={[style.text, {color: 'rgba(36, 164, 222, 1)'}]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              {Loading && (
                <ActivityIndicator size={'large'} color={COLORS.primary} />
              )}
              {DocSpec.map((item, index) => (
                <DoctorSpeciality
                  key={index.toString()}
                  spec={item.toUpperCase()}
                  imageURL={
                    'https://cdn-icons-png.flaticon.com/512/3028/3028573.png'
                  }
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={[style.text, {color: 'black', fontSize: 18}]}>
                Doctors near you
              </Text>
              <TouchableOpacity>
                <Text style={[style.text, {color: 'rgba(36, 164, 222, 1)'}]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {Loading && (
              <ActivityIndicator size={'large'} color={COLORS.primary} />
            )}
            <FlatList
              data={NearDoc}
              horizontal
              nestedScrollEnabled
              contentContainerStyle={{
                marginVertical: 10,
                marginBottom: auth?.queueStatus ? 80 : 10,
              }}
              renderItem={val => (
                <DoctorNearCard
                  key={val.item.mc_data.mc_id}
                  speciality={val.item.doc_data.specialization.join(' , ')}
                  onPress={() => onNearDocPress(val.item)}
                  imageURL={val.item.doc_data.img_link}
                  fname={val.item.doc_data.name_.split(' ')[0]}
                  lname={val.item.doc_data.name_.split(' ')[1]}
                />
              )}
            />
          </SafeAreaView>
        </ScrollView>
        {auth?.queueStatus && (
          <LiveQueueOnGoing
            data={auth?.queueStatus}
            onPressOpen={() => {
              navigation.navigate('LiveQueue');
            }}
          />
        )}
        <BottomSheet
          show={ShowBottomSheet}
          height={550}
          onOuterClick={() => {
            console.log('first');
          }}>
          <View>
            <Image
              source={require('../assets/LocationPermissionImg.jpg')}
              style={{
                width: '100%',
                height: 330,
                resizeMode: 'cover',
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}></Image>
            <Text
              style={[
                style.text,
                {color: 'rgba(9, 5, 38, 1)', fontSize: 20, textAlign: 'center'},
              ]}>
              Enable your location
            </Text>
            <Text
              style={[
                style.text,
                {
                  color: 'rgba(111, 111, 115, 1)',
                  textAlign: 'center',
                  marginHorizontal: 35,
                },
              ]}>
              <Text style={{color: 'rgba(36, 164, 222, 1)'}}>DocTrue</Text>{' '}
              collects location data to show doctors near your area and track your
              appointments even when the app is not in use
            </Text>
            <TouchableOpacity
              onPress={() => {
                reqPermission();
                setShowBottomSheet(false);
              }}
              style={style.bottomSheetCloseButton}>
              <Text style={[style.buttonText, style.text]}>Turn On</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowBottomSheet(false);
                navigation.getParent().setOptions({
                  tabBarStyle: {
                    display: 'flex',
                    height: 65,
                  },
                });
              }}>
              <Text
                style={[
                  style.text,
                  {color: '#24A4DE', marginTop: 15, textAlign: 'center'},
                ]}>
                No, thanks
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </>
    );
  };
  
  export default Home;
  
  const style = StyleSheet.create({
    mainConatiner: {
      paddingTop: 16,
      backgroundColor: COLORS.offWhite,
      flex: 1,
    },
    Container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    curvedContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    text: {
      fontFamily: FONTS.regular,
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      height: 46,
      margin: 12,
      padding: 8,
      color: COLORS.lightgray,
      width: '80%',
      alignSelf: 'center',
    },
    bottomSheetText: {
      fontSize: 24,
      marginBottom: 80,
    },
    bottomSheetCloseButton: {
      backgroundColor: '#24A4DE',
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
      paddingHorizontal: 30,
      marginTop: 15,
    },
    buttonText: {
      fontSize: 20,
      color: 'white',
    },
  });
  