import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { useFonts } from 'expo-font'; // Import useFonts from expo-font

import pomeranian1Png from "../assets/pomeranian1.png";
import pomeranian2Png from "../assets/pomeranian2.png";
import ragdollPng from "../assets/ragdoll.png";

export default function WelcomeScreen() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}/>
      <View style={styles.appNameContainer}>
        <Text style={[styles.appName, { fontSize: 50, shadowColor:'blue',color: 'purple' }]}>PAWFECT PALOOZA:</Text>
        <Text style={[styles.appName, styles.subTitle, { fontSize: 45, shadowColor:'blue',color:'purple' }]}>Whisker Wonderland Edition</Text>
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
    fontSize: 30,
    alignItems: 'center', 
  },
  subTitle: {
    fontSize: 20,
    alignItems: 'stretch',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap'
  },
  image: {
    height: 150, 
    width: 150, 
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  registrationLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
