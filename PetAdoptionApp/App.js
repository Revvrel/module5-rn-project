// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { Card } from '@rneui/themed';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

export default () => {
return (
  <>
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 5,
        flexGrow: 1,
      }}
    >
      <Icon
        name='rowing' />

      <Icon
        name='g-translate'
        color='#00aced' />

      <Icon
        name='sc-telegram'
        type='evilicon'
        color='#517fa4'
      />

      <Icon
        reverse
        name='ios-american-football'
        type='ionicon'
        color='#517fa4'
      />

      <Icon
        raised
        name='heartbeat'
        type='font-awesome'
        color='#f50'
        onPress={() => console.log('hello')} />
    </View>
  </>
);
};