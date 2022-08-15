import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

let { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PictureDetails = ({ route }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state.',
    ]);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>{route.params.data.item.title}</Text>
        <Image
          source={{ uri: route.params.data.item.url }}
          style={styles.imageStyle}
        />
        <Text style={styles.explanationText}>
          Description: {route.params.data.item.explanation}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageStyle: {
    height: screenWidth,
    width: '100%',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  explanationText: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'normal',
    fontSize: 16,
  },
});

export default PictureDetails;
