import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Pressable,
  Modal
} from "react-native";
import axios from "axios";
import Header from "../component/Header";
import navigationStrings from "../constants/navigationStrings";
import ModalComponent from '../component/ModalComponent';

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const api_key = navigationStrings.apiKey;

  const errorMessage = () => {
    if (startDate === "" || endDate === "") {
      return "Start date or/and end date is/are empty";
    } else if (startDate > endDate) {
      return "Start date should be less than or equal to end date.";
    } else {
      return null;
    }
  };

  const searchResults = () => {
    const err = errorMessage();
    if (err != null) {     
      setShowWarning(true); 
    } else {
      //If there's not error fetch data from cusomized linked based on start date, end date and API key
      const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`;
      axios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setData(res.data);
        })
        .catch((err) => 
          setShowWarning(true)
        );
    }
  };

  const renderImages = (item) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: "left" }}
        //Navigate to picture details screen
        onPress={() => navigation.navigate("Picture Details", { data: item })}
      >
        <Image
          source={{ uri: item.item.url }}
          style={styles.imageStyle}
        ></Image>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View>
        <Header />
        
        
        <Modal visible={showWarning} onRequestClose={() => setShowWarning(false)} transparent>
          <View style={styles.centeredView}>
            <View style={styles.warningModal}>
              <View style={styles.warningTitle}>
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Warning ⚠️</Text>
              </View>
              <View style={styles.warningBody} >
              <Text style={{fontSize: 20, color: 'grey', fontWeight: 'bold'}}>Please enter valid start date and/or end date details and try again.</Text>
              </View>
              <Pressable onPress={()=> setShowWarning(false)} style={styles.okButton}>
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>




        <TextInput
          style={styles.textInputs}
          placeholder="  Start date (DD-MM-YYYY)"
          onChangeText={(val) =>
            setStartDate(val.split("-").reverse().join("-"))
          }
          activeUnderlineColor="none"
          left={
            <TextInput.Icon
              name="calendar-month-outline"
              color={navigationStrings.secondaryColor}
            />
          }
          mode="flat"
          borderBottomColor={navigationStrings.secondaryColor}
        />
        <TextInput
          style={styles.textInputs}
          placeholder="  End date (DD-MM-YYYY)"
          onChangeText={(val) => setEndDate(val.split("-").reverse().join("-"))}
          activeUnderlineColor="none"
          left={
            <TextInput.Icon
              name="calendar-month-outline"
              color={navigationStrings.secondaryColor}
            />
          }
        />

        <TouchableOpacity style={styles.button} onPress={() => searchResults()}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Search
          </Text>
        </TouchableOpacity>

        <Text style={styles.resultsText}>Results ({data.length}):</Text>
        {data.length === 0 ? (
          <Text style={styles.warningText}>
            No results found. Enter a start and end date.
          </Text>
        ) : isLoading ? (
          <ActivityIndicator size="large" color="grey" animating={true} />
        ) : (
          <FlatList
            horizontal={false}
            contentContainerStyle={{ marginHorizontal: 10 }}
            numColumns={3}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImages}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputs: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 60,
    borderBottomColor: navigationStrings.secondaryColor,
    alignSelf: "stretch",
    fontSize: 20,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f9fc",
    marginTop: 20,
    marginHorizontal: 10,
    height: 50,
    alignSelf: "stretch",
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: navigationStrings.primaryColor,
  },
  imageStyle: {
    height: screenWidth / 3.3,
    width: screenWidth / 3.3,
    marginHorizontal: 4,
    marginTop: 10,
    borderRadius: 10,
  },
  resultsText: {
    marginTop: 40,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: navigationStrings.secondaryColor,
  },
  warningText: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "normal",
    fontSize: 15,
    color: navigationStrings.primaryColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  warningModal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  warningTitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navigationStrings.secondaryColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  warningBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  okButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navigationStrings.primaryColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  }
});

export default Home;

//Styles in '%' :

// const styles1 = StyleSheet.create({
//   textInputs: {
//     marginTop: '2%',
//     marginHorizontal: 10,
//     height: '15%',
//     borderRadius: '10%',
//     alignSelf: 'stretch',
//     fontSize: 20,
//     backgroundColor: '#f6f9fc',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: "#f6f9fc",
//     marginTop: '5%',
//     marginLeft: '2%',
//     marginRight: '2%',
//     height: '12%',
//     alignSelf: 'stretch',
//     borderRadius: '10%',
//     borderWidth: 2,
//   },
//   container: {
//     marginTop: '4%',
//     flexDirection: 'row',
//     alignItems: 'left',
//     justifyContent: 'left',
//     backgroundColor: '#fff',
//   },
//   imageStyle: {
//     height: screenWidth / 3.2,
//     width: screenWidth / 3.2,
//     marginTop: '2%',
//     borderRadius: '10%',
//   },
//   resultsText: {
//     marginTop: '10%',
//     marginLeft: '2%',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   warningText: {
//     marginTop: '2%',
//     marginLeft: 10,
//     fontWeight: 'normal',
//     fontSize: 15,
//   },
// });

//Date picker:

//https://taofiqcodes.hashnode.dev/how-to-implement-date-picker-with-text-input-in-react-native
//https://www.youtube.com/watch?v=Imkw-xFFLeE

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// const [date, setDate] = useState("");
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


{
  /* <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */
}

// const showDatePicker = () => {
//   setDatePickerVisibility(true);
// };

// const hideDatePicker = () => {
//   setDatePickerVisibility(false);
// };

// const handleConfirm = (date) => {
//   setDate(date);
//   hideDatePicker();
//   console.log(date);
// };

// const getDateOfBirth = () => {
//   let newDate = new Date(date).toLocaleDateString();
//   console.log(newDate) // 4/15/2022
//   return date !== "" ? newDate : "";
// };
