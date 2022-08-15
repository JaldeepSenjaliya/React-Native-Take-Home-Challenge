import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from '../component/Header';

let { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const searchResults = () => {
    if (startDate === '' || endDate === '') {
      alert('Start date or/and end date is/are empty');
    } else if (startDate > endDate) {
      alert('Start date should be less than or equal to end date.');
    } else {
      const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=AddEttsg0VRFmHNcF1kkRJJ4daTbn85PiCIDK9Br`;

      axios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setData(res.data);
        })
        .catch((err) => alert(err.message));
    }
  };

  const renderImages = (item) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'left'}}
        onPress={() => navigation.navigate('Picture Details', { data: item })}
      >
        <Image
          source={{ uri: item.item.url }}
          style={styles.imageStyle}
        ></Image>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
      <ScrollView>
        <Header />
        <TextInput
          style={styles.textInputs}
          placeholder='  Start date (DD-MM-YYYY)'
          onChangeText={(val) =>
            setStartDate(val.split('-').reverse().join('-'))
          }
        />

        <TextInput
          style={styles.textInputs}
          placeholder='  End date (DD-MM-YYYY)'
          onChangeText={(val) => setEndDate(val.split('-').reverse().join('-'))}
        />

        <TouchableOpacity style={styles.button} onPress={() => searchResults()}>
          <Text>Search</Text>
        </TouchableOpacity>

        <Text style={styles.resultsText}>Results ({data.length}):</Text>
        {data.length === 0 ? (
          <Text style={styles.warningText}>
            No results found. Enter a start and end date.
          </Text>
        ) : isLoading ? (
          <ActivityIndicator size='large' color='grey' animating={true} />
        ) : (
          <FlatList
            horizontal={false}
            contentContainerStyle={{ marginLeft: 10, marginRight: 10 }}
            numColumns={3}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImages}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputs: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 60,
    borderRadius: 10,
    alignSelf: 'stretch',
    fontSize: 20,
    backgroundColor: '#f6f9fc',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f6f9fc",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 2,
  },
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 125,
    width: 125,
    marginTop: 10,
    borderRadius: 5,
  },
  resultsText: {
    marginTop: 40,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  warningText: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'normal',
    fontSize: 15,
  },
});

export default Home;
