import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Pending Login logic
    // Need to compare username and password with supabase
    navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default Login;
