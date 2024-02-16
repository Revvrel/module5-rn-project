//import { StatusBar } from "expo-status-bar";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../lib/supabase";
import COLORS from "../../components/Pet/const/colors";
import { Button } from "@rneui/themed";

import { styles } from "../../assets/styles/PetProfile.styles.js";

const Stack = createStackNavigator();

const PetProfile = ({ navigation }) => {
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
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <StatusBar backgroundColor={COLORS.background} />

        <ScrollView style={{flex: 1}}>
          {fetchError && <Text>{fetchError}</Text>}

          <ImageBackground
            resizeMode="contain"
            source={require("../../assets/images/choosePet1.jpg")} // Add your image source here
            style={{
              height: 650,
              width: '100%',
              top: 0,
              left: 0,
              right: 0,
              position:'absolute',
              resizeMode: 'cover',
              // zIndex: -99,
              flex: 1
            }}
            >



          <View style={{flexDirection:'column', height: '90%', justifyContent:'space-between', paddingHorizontal: 20,}}>

            {/* Top Buttons */}
            <View style={styles.topButtons}>
              <Icon
                name="arrow-left"
                size={28}
                color={"white"}
                onPress={navigation.goBack}
              />
              <Icon name="dots-vertical" size={28} color={"white"} />
            </View>
              


              {petProfiles && (
              <View>
                {petProfiles.map((profile) => (
                  <View
                    key={profile.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >

                    {/* Pet Name */}
                    <View style={{flexDirection: "row"}}>
                      <Text
                      style={{
                        fontSize: 24,
                        color: 'white',
                        fontWeight: "bold",
                      }}
                    >
                      {profile.name}
                      </Text>
                      
                      {/* Pet Gender */}
                    <Icon
                        name={
                          profile.gender == "male"
                            ? "gender-male"
                            : "gender-female"
                        }
                        size={23}
                        color={COLORS.primary}
                      />
                      {/* <Text style={{ fontSize: 12, color: '#B6A6A1' }}>
                        {profile.gender == "male" ? "Male" : "Female"}
                      </Text> */}

                    </View>


                    
                    

                    
                    
                  </View>
                ))}
                  


                  {petProfiles && (
                      <View style={styles.locationInfo}>
                        {petProfiles.map((profile) => (
                          <View
                            key={profile.id}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 5,
                            }}
                          >
                            <Icon
                              name="map-marker"
                              color={COLORS.primary}
                              size={20}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: 'white',
                                marginLeft: 5,
                              }}
                            >
                              {profile.location}
                            </Text>

                            
                          </View>
                        ))}
                      </View>
                    )}
              </View>
              )}

            </View>
              

          </ImageBackground>

          {/* Pet Profile Card */}
          <View style={[styles.detailsContainer, {paddingHorizontal: 30}]}>
          
              

              {/* <View >

                    <Icon name="map-marker" color={COLORS.primary} size={20} />
                    
                    <Text style={{ fontSize: 14, color: COLORS.grey, marginLeft: 5 }}>
                      10880 Malibu Point, 90265
                      </Text>

                    
              </View> */}
              

              
            {petProfiles && (
              <View>
                {petProfiles.map((profile) => (
                  
                  <View
                    key={profile.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >



              <View style={styles.petDetailContainer}>
                      

                  <View style={styles.petDetailBox}>
                    {/* Pet Color */}
                      <Text style={styles.petDetail}>
                        {profile.breed}
                          {'\n'}
                          <Text style={styles.petDetailLabel}>
                          Breed
                          </Text>
                      </Text>
                      </View>
                      

                  <View style={styles.petDetailBox}>
                    {/* Pet Color */}
                      <Text style={styles.petDetail}>
                        {profile.color}
                          {'\n'}
                          <Text style={styles.petDetailLabel}>
                          Color
                          </Text>
                      </Text>
                      </View>
                      

                  <View style={styles.petDetailBox}>
                    {/* Pet Color */}
                      <Text style={styles.petDetail}>
                        {profile.weight} kg
                          {'\n'}
                          <Text style={styles.petDetailLabel}>
                          Weight
                          </Text>
                      </Text>
                      </View>
                      

                  <View style={styles.petDetailBox}>
                    {/* Pet Color */}
                      <Text style={styles.petDetail}>
                        {profile.age} years old
                          {'\n'}
                          <Text style={styles.petDetailLabel}>
                          Age
                          </Text>
                      </Text>
                  </View>

                   
                      
                    

                </View>
                    

                    


                      {/* Adoption Cost */}
                    {/* <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.dark,
                      }}
                    >
                      ${profile.price}                      
                    </Text> */}
                      

                    
                  </View>
                ))}
              </View>
              )}
              
              


              <View style={styles.infoContainer}>
                

                 {/* Comment container */}
        
                    {/* Render user image , name and date */}
                  <View style={styles.ownerContainer}>
                      <Image
                        source={require("../../assets/images/potts.jpg")}
                        style={styles.ownerImg}
                      />
                      
                    <View style={styles.ownerInfoBox}>   
                      
                      <Text style={styles.ownerLabel}>
                          Owner
                      </Text>
                      
                      <Text style={styles.ownerName} >
                        Pepper Potts
                      </Text>
                        
                    </View>
                    

                    <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                        Feb 11, 2024
                    </Text>
                    

                  </View>
                  


                  <Text style={styles.ownerComment}>
                  Meet Samantha, a charming and affectionate feline looking for her forever home! Samantha is a spayed and vaccinated cat who has been a cherished member of our family for years.
                  {'\n'}{'\n'}
                      
                  Due to personal circumstances, we're sadly unable to provide her with the attention and care she deserves. Samantha is a gentle soul who loves curling up in sunny spots and enjoys the occasional play session with her favorite toys. She's litter-trained and has a clean bill of health.
                  {'\n'}{'\n'}
                  
                  We believe she would thrive in a calm and loving environment where she can receive plenty of affection and attention. If you're ready to open your heart and home to a wonderful companion, Samantha would love to meet you!
                </Text>
                
                </View>


              {/* Render footer */}
                <View style={styles.footer}>
                  <View style={styles.iconCon}>
                    <Icon name="heart-outline" size={22} color={COLORS.white} />
                  </View>
                  <View style={styles.btn}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      Adopt Me!
                    </Text>
                  </View>
                </View>


              


        </View>

        </ScrollView>


      </SafeAreaView>
      </NavigationContainer>
  );
};

export default PetProfile;
