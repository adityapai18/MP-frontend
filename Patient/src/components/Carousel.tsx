import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS} from '../constants/theme';
import useInterval from '../lib/hooks/useInterval';
import LottieView from 'lottie-react-native';
const dummyData = [
  {
    title: 'STOP WAITING',
    body: 'in clinics & hospitals',
    url: require('../../assets/PeopleWaiting.json'),
  },
  {
    title: 'BOOK APPOINTMENTS',
    url: require('../../assets/AppointmentBooking.json'),
    body: 'with your favourite doctors',
  },
  {
    title: 'VIRTUAL LIVE QUEUE',
    url: require('../../assets/LiveQueue.json'),
    body: '& be on time for your consultations',
  },
];
interface CarouselItems {
  title: string;
  body: string;
  url: any;
}
const ViewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const Carousel = () => {
  let flatListRef = useRef<FlatList<CarouselItems> | null>();
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const onViewRef = useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });
  useInterval(() => {
    if (CurrentIndex == 0) {
      scrollToIndex(1);
    }
    if (CurrentIndex == 1) {
      scrollToIndex(2);
    }
    if (CurrentIndex == 2) {
      scrollToIndex(0);
    }
  }, 4000);
  const renderItem: React.FC<{item: CarouselItems}> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.title);
        }}
        style={{
          width: Dimensions.get('window').width - 40,
          height: 160,
          backgroundColor: 'rgba(36, 164, 222, 1)',
          borderRadius: 10,
          flexDirection: 'row',
          padding: 25,
        }}>
        <View style={{flex: 1}}>
          <LottieView source={item.url} autoPlay loop></LottieView>
        </View>
        <View
          style={{
            flex: CurrentIndex > 0 ? 1.5 : 1,
            alignSelf: 'center',
            marginLeft: '5%',
          }}>
          {CurrentIndex === 2 ? (
            <>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 18,
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: 20,
                  },
                ]}>
                Join Our{' '}
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 18,
                      fontWeight: '700',
                      color: 'rgba(9, 3, 35, 1)',
                      lineHeight: 20,
                    },
                  ]}>
                  {item.title}
                </Text>{' '}
                {item.body}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 18,
                    fontWeight: '700',
                    color: 'rgba(9, 3, 35, 1)',
                    lineHeight: 20,
                  },
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 18,
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: 20,
                  },
                ]}>
                {item.body}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref => {
          flatListRef.current = ref;
        }}
        viewabilityConfig={ViewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        style={styles.carousel}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.viewDot}>
        {dummyData.map(({}, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.circle,
              {
                backgroundColor:
                  index == CurrentIndex
                    ? 'rgba(36, 164, 222, 1)'
                    : 'rgba(217, 217, 217, 1)',
              },
            ]}
            onPress={() => scrollToIndex(index)}></TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'cover',
  },
  footer: {},
  carousel: {
    maxHeight: 300,
  },
  viewDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    margin: 5,
  },
  text: {
    fontFamily: FONTS.regular,
  },
});
