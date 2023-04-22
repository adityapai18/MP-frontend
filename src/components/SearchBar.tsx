import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Image,
  Pressable,
  TextInputProps
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface SearchBar {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  customWidth?: string;
  PlaceHolder: string;
  onSearchBarPressed?: () => void;
  TextInputProp? : TextInputProps 
}
const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  PlaceHolder,
  customWidth,
  onSearchBarPressed,
  TextInputProp
}: SearchBar) => {
  return (
    <View
      style={[styles.container, {width: customWidth ? customWidth : '85%'}]}>
      <View style={[styles.searchBar__unclicked]}>
        {/* search Icon */}
        <Ionicons name="search" size={24} color="grey" />
        {/* Input field */}
        <TextInput
          onPressIn={onSearchBarPressed}
          style={styles.input}
          placeholder={PlaceHolder}
          value={searchPhrase}
          onChangeText={text => {
            if (text.length > 0) {
              setClicked(true);
            } else {
              setClicked(false);
            }
            setSearchPhrase(text);
          }}
          placeholderTextColor={'grey'}
          {...TextInputProp}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {/* {clicked && (
          <Pressable
            onPress={() => {
              setSearchPhrase('');
            }}
            style={{marginLeft: 'auto'}}>
             <Ionicons name="search" size={24} color="grey" />
          </Pressable>
        )} */}
      </View>
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  searchBar__unclicked: {
    paddingLeft: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    width: '100%',
    color: 'grey',
  },
});
