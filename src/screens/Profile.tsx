import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginOut } from '../features/login/loginSlice';

type ProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Profile: React.FC<ProfileProps> = ({navigation}) => {
  const user = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();

  const handleCreateUser = () => {
    dispatch((loginOut()));
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.label}>
        <Text>Name: {user.username}</Text>  
      </View>
      <View style={styles.label}>
        <Text>Email: {user.email}</Text>
      </View>
      <Button title="Sing Out" onPress={() => handleCreateUser()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  label: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    display:'flex',
    justifyContent: 'center',
  },
});

export default Profile;
