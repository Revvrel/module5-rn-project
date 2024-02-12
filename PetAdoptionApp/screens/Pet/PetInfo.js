import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import * as React from "react";
import { useState, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider, TextInput } from "react-native-paper";
import { Button } from "@rneui/themed";
import supabase from "../../config/supabaseClient/";

// const CustomLabel = ({ children, color }) => (
//   <Text style={{ color }}>{children}</Text>
// );

export default function PetInfo() {
  const [name, setName] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [formError, setFormError] = useState("");

  const navigation = useNavigation();
  
  const handleSubmit = async () => {
    if (
      !name ||
      !breed ||
      !weight ||
      !age ||
      !color ||
      !price ||
      !location ||
      !gender
    ) {
      //passing the error to a const so that 'alert' can display it immediately. Async nature of the language will prevent it otherwise
      const errorMessage = "Please fill in all the required fields.";
      setFormError(errorMessage);
      alert(errorMessage);
      return;
    }

    try {
      const lowerCaseGender = gender.toLowerCase();
      //const weightNumber = parseFloat(weight);
      let insertData = {
        name,
        breed,
        weight: parseFloat(weight),
        age: parseInt(age),
        color,
        price: parseFloat(price),
        location,
        gender: lowerCaseGender,
      };

      const { data, error } = await supabase
        .from("pet_profiles")
        .insert([insertData]);

      if (error) {
        const errMessage = error;
        setFormError(errMessage);
        alert(errMessage);
      }

      if (data) {
        setFormError(null);
        //navigation.navigate("PetProfile");
      }
    } catch (error) {
      const errMessage = error.message;
      setFormError("Error inserting data:", errMessage);
      alert(errMessage);
    }

    alert("Form Submitted!");
  };

  return (
    <PaperProvider
      theme={{
        colors: {
          background: "#F6F6F6", // Change the background color of the label
          primary: "#FFB197", // Change the primary color of the label
          text: "#FFB197", // Change the text color of the label
        },
      }}
    >
      <NavigationContainer independent={true}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.inputContainer}>
            <Text
              style={{
                paddingVertical: 30,
                fontSize: 18,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Information Of Your Pet
            </Text>
            <TextInput
              style={styles.input}
              //label={<CustomLabel color="#E4BDFF">Name...</CustomLabel>}
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <TextInput
              style={styles.input}
              label="Breed"
              mode="outlined"
              value={breed}
              onChangeText={(breed) => setBreed(breed)}
            />
            <TextInput
              style={styles.input}
              label="Weight(kg)"
              mode="outlined"
              value={String(weight)}
              onChangeText={(text) => setWeight(text)}
              keyboardType="numeric"         
            />
            <TextInput
              style={styles.input}
              label="Age"
              mode="outlined"
              value={String(age)}
              onChangeText={(age) => setAge(age)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              label="Color"
              mode="outlined"
              value={color}
              onChangeText={(color) => setColor(color)}
            />
            <TextInput
              style={styles.input}
              label="Price"
              mode="outlined"
              value={String(price)}
              onChangeText={(price) => setPrice(price)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              label="Location"
              mode="outlined"
              value={location}
              onChangeText={(location) => setLocation(location)}
            />
            <TextInput
              style={styles.input}
              label="Gender"
              mode="outlined"
              value={gender}
              onChangeText={(gender) => setGender(gender)}
            />
          </View>
          <Button
            buttonStyle={{
              backgroundColor: "#FFB197",
              borderRadius: 50,
              padding: 10,
              height: 50,
            }}
            containerStyle={{
              width: 150,
              justifyContent: "center",
              marginHorizontal: 120,
              marginVertical: 5,
            }}
            title="Submit"
            onPress={handleSubmit}
          />
          <View style={{ marginVertical: 10 }} />
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PetProfile");
              }}
            >
              <Text style={{ color: "blue" }}>Go to pet profile page</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    //backgroundColor: "#F4E4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
    borderRadius: 12, // Curving the edges
    //overflow: "hidden", // Ensure the border-radius is applied correctly
  },
  input: {
    width: 300,
    fontSize: 15,
    marginBottom: 5,
  },
});
