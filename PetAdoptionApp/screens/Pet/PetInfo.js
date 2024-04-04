import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { Button } from "@rneui/themed";
// import supabase from "../../config/supabaseClient/";
import { supabase } from "../../lib/supabase";
import { styles } from "../../assets/styles/index.js";

// const CustomLabel = ({ children, color }) => (
//   <Text style={{ color }}>{children}</Text>
// );

export default function PetInfo() {
  const [id, setId] = useState("");
  const [name, setName] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [formError, setFormError] = useState("");
  const [session, setSession] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [petProfiles, setPetProfiles] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSession();
    fetchPetProfiles();
  }, []);

  async function fetchSession() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setSession(user);
      console.log(user.id);
    } catch (error) {
      console.log("Error fetching session:", error.message);
    }
  }

  async function fetchPetProfiles() {
    await fetchSession();

    const { data, error } = await supabase //fetching the data in supabase
      .from("pet_profiles") //the supabase table's name
      .select("*")
      // .eq("profiles_id", session.id); //select all statement( select * from)
    console.log(data);

    if (error) {
      setFetchError("Unable to fetch data from:" + "this table");
      setPetProfiles(null); //setting to null so to reset the data
      alert(error);
    }
    if (data) {
      setPetProfiles(data);
      setFetchError(null);
    }
  }

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
      await fetchSession();

      const lowerCaseGender = gender.toLowerCase();
      //const weightNumber = parseFloat(weight);
      let insertData = {
        profiles_id: session.id,
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

      console.log(insertData);

      if (error) {
        const errMessage = error;
        setFormError(errMessage);
        alert(errMessage);
        console.log(errMessage);
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
          <View style={styles.container}>
            <Text style={styles.h1}>Pet Profile</Text>
            <Text style={{ textAlign: "center", paddingBottom: 20 }}>
              Create a pet profile to put pets up for adoption here!
            </Text>
            <TextInput
              style={styles.input}
              //label={<CustomLabel color="#E4BDFF">Name...</CustomLabel>}
              placeholder="Name"
              // mode="outlined"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <TextInput
              style={styles.input}
              placeholder="Breed"
              mode="outlined"
              value={breed}
              onChangeText={(breed) => setBreed(breed)}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight(kg)"
              mode="outlined"
              value={String(weight)}
              onChangeText={(text) => setWeight(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              mode="outlined"
              value={String(age)}
              onChangeText={(age) => setAge(age)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Color"
              mode="outlined"
              value={color}
              onChangeText={(color) => setColor(color)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              mode="outlined"
              value={String(price)}
              onChangeText={(price) => setPrice(price)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              mode="outlined"
              value={location}
              onChangeText={(location) => setLocation(location)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              mode="outlined"
              value={gender}
              onChangeText={(gender) => setGender(gender)}
            />

            <Button
              buttonStyle={{
                backgroundColor: "#FFB197",
                borderRadius: 50,
                padding: 15,
                height: 55,
              }}
              containerStyle={{
                width: 150,
                justifyContent: "center",
                marginHorizontal: 120,
                marginVertical: 10,
              }}
              title="Submit"
              onPress={handleSubmit}
            />
            
            <View style={{ marginVertical: 10 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginRight: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PetProfile");
                  }}
                >
                  <Text style={styles.link}>Go to pet profile page</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PetInfoUploader");
                  }}
                >
                  <Text style={styles.link}>Upload pet's photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </NavigationContainer>
    </PaperProvider>
  );
}
