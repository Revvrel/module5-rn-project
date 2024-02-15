import React from "react";
import { Text, View, ScrollView } from "react-native";
import { version } from "../package.json";
import { styles } from "../assets/styles/index.js";
import { ListItem } from "@rneui/themed";

export default function Help() {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.h1, {alignSelf: 'center', width: '100%'}]}>Frequently Asked Questions</Text>

      {/* Q1 */}
      <ListItem.Accordion 
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              1. What is the purpose of this app?
            </ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={!expanded1}
        onPress={() => {
          setExpanded1(!expanded1);
          setExpanded2(false);
          setExpanded3(false);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>
              Our pet adoption app aims to connect loving homes with adorable
              pets in need of adoption. We facilitate the process of finding,
              adopting, and caring for pets, ensuring a seamless and rewarding
              experience for both pets and adopters.
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>

      {/* Q2 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              2. How does the app work?
            </ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded2}
        onPress={() => {
          setExpanded2(!expanded2);
          setExpanded1(true);
          setExpanded3(false);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>
              Our app features a user-friendly interface where users can browse
              through profiles of pets available for adoption. Users can filter
              their search based on preferences such as species, breed, age, and
              location. Once they find a pet they're interested in, they can
              initiate the adoption process directly through the app.
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>

      {/* Q3 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              3. Is the adoption process done entirely through the app?
            </ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded3}
        onPress={() => {
          setExpanded3(!expanded3);
          setExpanded1(true);
          setExpanded2(false);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>
              While most of the adoption process can be completed through the
              app, there might be instances where users need to visit the
              shelter or rescue organization in person to finalize the adoption.
              However, our app streamlines the initial steps, making it
              convenient for users to find and connect with pets.
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
}
