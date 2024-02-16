//import { StatusBar } from "expo-status-bar";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../lib/supabase";
import COLORS from "../../components/Pet/const/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";

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
    <ScrollView>
    <NavigationContainer independent={true}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar backgroundColor={COLORS.background} />
        <View style={{
          height: 400,
          backgroundColor: COLORS.background
        }}>
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
              zIndex: -99,
              flex: 1
            }}
          >
            {/* Render Header */}
            <View style={styles.header}>
              <Icon
                name="arrow-left"
                size={28}
                color={COLORS.light}
                onPress={navigation.goBack}
              />
              <Icon name="dots-vertical" size={28} color={COLORS.light} />
            </View>
          </ImageBackground>

          {/* Pet Profile Card */}
          <View style={styles.detailsContainer}>
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
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLORS.dark,
                        fontWeight: "bold",
                      }}
                    >
                      {profile.name}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name={
                          profile.gender == "male"
                            ? "gender-male"
                            : "gender-female"
                        }
                        size={30}
                        color={COLORS.grey}
                      />
                      <Text style={{ fontSize: 10 }}>
                        {profile.gender == "male" ? "Male" : "Female"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Render Pet breed and age */}
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
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.dark,
                      }}
                    >
                      Breed: {profile.breed}
                    </Text>
                    <Text style={{ fontSize: 13, color: COLORS.dark }}>
                      Color: {profile.color}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Render Pet price, weight & location */}
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
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.dark,
                      }}
                    >
                      ${profile.price}                      
                    </Text>
                    <Text style={{ fontSize: 13, color: COLORS.dark, paddingLeft: 110 }}>
                    Weight: {profile.weight}Kg
                    </Text>
                    <Text style={{ fontSize: 13, color: COLORS.dark }}>
                      Age: {profile.age}
                    </Text>
                  </View>
                ))}
              </View>
            )}

              {/* Render location and icon */}
              <View style={styles.infoContainer}>
                <View style={styles.locationInfo}>

                    <Icon name="map-marker" color={COLORS.primary} size={20} />
                    
                    <Text style={{ fontSize: 14, color: COLORS.grey, marginLeft: 5 }}>
                      10880 Malibu Point, 90265
                      </Text>

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
                            <Icon
                              name="map-marker"
                              color={COLORS.primary}
                              size={20}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: COLORS.grey,
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


                 {/* Comment container */}
                  <View style={styles.detailContainer}>           
                    {/* Render user image , name and date */}
                    <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 20 }}>
                      <Image
                        source={require("../../assets/images/potts.jpg")}
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                      />
                      
                      <View style={{ flex: 1, paddingLeft: 10 }}>                
                        <Text
                          style={{
                            color: COLORS.dark,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          Pepper Potts
                        </Text>
                        <Text
                          style={{
                            color: COLORS.grey,
                            fontSize: 11,
                            fontWeight: "bold",
                            marginTop: 2,
                          }}
                        >
                          Owner
                        </Text>
                      </View>
                      <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                        Feb 11, 2024
                      </Text>
                    </View>
                    <Text style={styles.comment}>
                      I am migrating to another country and I can't take my cat along
                      sadly. Looking for kind people to adopt my cat.            
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
        </View>

        </View>


      </SafeAreaView>
      </NavigationContainer>
      </ScrollView>
  );
};

export default PetProfile;

const styles = StyleSheet.create({
  detailsContainer: {
    // height: 120,
    width: '100%',
    backgroundColor: COLORS.white,
    // marginHorizontal: 20,
    top: 600,
    flex: 1,
    flexDirection: 'column',
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  comment: {
    marginTop: -10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  locationInfo: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userIdentity: {
    color: COLORS.grey,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,

  },
  ownerDP: {
    height: 40, 
    width: 40, 
    borderRadius: 20
  },
  ownerInfo: {
    // flex: 1,
    flexDirection: "column",
  },
  ownerName: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: "bold",

  },
  footer: {
    height: 100,
    // backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "fixed"
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});
