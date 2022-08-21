// import React, { useState } from "react";
// import { Text, View, Button } from "react-native";

// const ViewA = ({ navigation }) => {
//   const [val, setVal] = useState(null);
//   const [val2, setVal2] = useState(null);
//   const callBack = (value1,value2) => {
//     setVal(value1);
//     setVal2(value2);
//   };
//   const onNextPress = () => {
//     navigation.navigate("Second Screen", { callBack: callBack });
//   };
//   return (
//     <View>
//       <Text>{val}{val2}</Text>
//       <Button title="Next" onPress={onNextPress} />
//     </View>
//   );
// };
// export default ViewA;


// import React from "react";
// import { View, Button } from "react-native";

// const ViewB = ({ route, navigation }) => {
//   const onBackPress = () => {
//     const { callBack } = route.params;
//     callBack(5,6); // Your new value to set
//     navigation.goBack();
//   };

//   return (
//     <View>
//       <Button title="back" onPress={onBackPress} />
//     </View>
//   );
// };
// export default ViewB;

// import React, {useState, useEffect} from 'react';
// import { Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const ViewA = ({ route, navigation }) => {
//   const onNextPress = () => {
//     navigation.navigate("ViewB", {
//       previousScreen: route.name
//     });
//   };

//   return (
//     <View>
//       <Text>ViewA</Text>
//       <Text>Params: {JSON.stringify(route.params)}</Text>
//       <Button title="Next" onPress={onNextPress} />
//     </View>
//   );
// };

// const ViewB = ({ route, navigation }) => {
//   const onBackPress = () => {
//     navigation.navigate(route.params.previousScreen, {
//       val: 5,
//       val2: 6,
//     })
//   };

//   return (
//     <View>
//       <Text>ViewB</Text>
//       <Text>Params: {JSON.stringify(route.params)}</Text>
//       <Button title="back" onPress={onBackPress} />
//     </View>
//   );
// };

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator mode="modal">
//         <Stack.Screen name="ViewA" component={ViewA} />
//         <Stack.Screen name="ViewB" component={ViewB} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// Snack
// Share
// Improve this answer
// Follow
// edited Nov 18, 2021 at 3:12
