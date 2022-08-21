import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import navigationStrings from "../constants/navigationStrings";

const ModalComponent = ({ title, message }) => {

const [showWarning, setShowWarning] = useState(false);


  rerurn(
    <Modal
      visible={showWarning}
      onRequestClose={() => setShowWarning(false)}
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.warningModal}>
          <View style={styles.warningTitle}>
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          </View>
          <View style={styles.warningBody}>
            <Text style={{ fontSize: 20, color: "grey", fontWeight: "bold" }}>
              {message}
            </Text>
          </View>
          <Pressable
            onPress={() => setShowWarning(false)}
            style={styles.okButton}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warningModal: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  warningTitle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: navigationStrings.secondaryColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warningBody: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  okButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: navigationStrings.primaryColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default ModalComponent;
