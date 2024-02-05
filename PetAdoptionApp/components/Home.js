import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen!</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
     flex: 1, 
     justifyContent: "center", 
     alignItems: "center",   
     backgroundColor: '#93C54B'
  },
  text: {
    fontSize: 32
  }
});
