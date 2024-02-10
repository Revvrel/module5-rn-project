import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import React, { useState } from "react";
import pomeranian1Png from "../assets/pomeranian1.png";
import pomeranian2Png from "../assets/pomeranian2.png";
import ragdollPng from "../assets/ragdoll.png";

export default function WelcomePage() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}/>
      <View style={styles.appNameContainer}>
      <Text style={[styles.appName, { fontSize: 50, shadowColor:'blue100',color: 'purple' }]}>PAWFECT PALOOZA:</Text>
      <Text style={[styles.appName, styles.subTitle, { fontSize: 45, shadowColor:'blue100',color:'purple' }]}>Whisker Wonderland Edition</Text>
      <StatusBar style="auto" />
      <Image style={styles.image} source={pomeranian1Png} />
      <Image style={styles.image} source={pomeranian2Png} />
      <Image style={styles.image} source={ragdollPng} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
  },
  appNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  appName: {
    fontFamily: 'Times New Roman', 
    fontSize: 30,
    alignItems: 'center', 
  },
  subTitle: {
    fontSize: 20, // Adjust the font size as needed
    alignItems: 'stretch',
    },
  imageContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'center', // Center items horizontally
    marginTop: 20, // Adjust spacing as needed
    flexWrap: 'wrap'
  },
  image: {
    height: 150, 
    width: 150, 
    resizeMode: 'cover', // or 'contain'
    marginHorizontal: 5,
  },
  registrationLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});