import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase'; // assuming supabase is properly imported

export default function BlankPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
        navigation.navigate('Login');
      } else if (!session) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    };

    checkSession();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
