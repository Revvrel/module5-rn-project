import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { useFonts } from 'expo-font'; // Import useFonts from expo-font

import logo from "../assets/logo.png";

export default function WelcomeScreen() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={logo} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap'
  },
  image: {
    height: 300, 
    width: 300, 
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
});
