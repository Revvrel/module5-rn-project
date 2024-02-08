import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { supabase } from "../../lib/supabase";

const Stack = createStackNavigator();

const PetProfile = () => {
  const [fetchError, setFetchError] = useState(null);
  const [petProfiles, setPetProfiles] = useState(null);

  useEffect(() => {
    //An "async" function, this allow us to use "await"
    const fetchPetProfiles = async () => {      
      const { data, error } = await supabase //fetching the data in supabase
        .from("pet_profiles") //the supabase table's name
        .select("*"); //select all statement( select * from)

      if (error) {
        setFetchError("Unable to fetch data from:" + "this table");
        setPetProfiles(null); //setting to null so to reset the data
        alert(error);
      }
      if (data) {
        setPetProfiles(data);
        setFetchError(null);
      }
    };
    fetchPetProfiles();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>      
        {fetchError && <Text>{fetchError}</Text>}
        {petProfiles && (
          <View style={styles.pet}>
            {petProfiles.map( profile => (
               <View key={profile.id} style={styles.petProfileCard}>
               
               <Text key={`name_${profile.id}`}>Name: {profile.name}</Text>
               <Text key={`weight_${profile.id}`}>Weight: {profile.weight}</Text>
               <Text key={`age_${profile.id}`}>Age: {profile.age}</Text>
              
             </View>              
            ))}
          </View>
        )}     
      </View>
    </NavigationContainer>
  );
};

export default PetProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
