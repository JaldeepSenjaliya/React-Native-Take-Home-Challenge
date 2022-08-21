import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import navigationStrings from '../constants/navigationStrings';

const Header = () => {
  return (
    <View>
      <Text style={styles.headingText}>Picture of the day:</Text>
      <Text style={styles.subHeadingText}>
        Search for Astronomy: Picture of the day by date.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    color: navigationStrings.secondaryColor,
    marginTop: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subHeadingText: {
    color: navigationStrings.primaryColor,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'normal',
    fontSize: 15,
  },
});

export default Header;
