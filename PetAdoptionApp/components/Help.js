import React from "react";
import { Text, View } from "react-native";
import { version } from "../package.json";
import { styles } from "../assets/styles/index.js";
import { ListItem } from '@rneui/themed';



export default function Help() {

  const [expanded, setExpanded] = React.useState(false);

  // console.log(version.version);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Frequently Asked Questions</Text>


      {/* Q1 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>1. What is the purpose of this app?</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={!expanded}
        onPress={() => {
          setExpanded(expanded);
        }}
      >
        <ListItem>
          
          <ListItem.Content>
            <ListItem.Subtitle>
              Our pet adoption app aims to connect loving homes with adorable pets in need of adoption. We facilitate the process of finding, adopting, and caring for pets, ensuring a seamless and rewarding experience for both pets and adopters.

            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>


      {/* Q2 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>2. How does the app work?</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          
          <ListItem.Content>
            <ListItem.Subtitle>
              Our app features a user-friendly interface where users can browse through profiles of pets available for adoption. Users can filter their search based on preferences such as species, breed, age, and location. Once they find a pet they're interested in, they can initiate the adoption process directly through the app.

            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>


      {/* Q3 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>3. Is the adoption process done entirely through the app?</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          
          <ListItem.Content>
            <ListItem.Subtitle>
              While most of the adoption process can be completed through the app, there might be instances where users need to visit the shelter or rescue organization in person to finalize the adoption. However, our app streamlines the initial steps, making it convenient for users to find and connect with pets.

            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>


      <Text>





      </Text>



      


    </View>
  );
}
