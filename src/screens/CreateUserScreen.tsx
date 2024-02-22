// screens/CreateUserScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addUser } from '../features/users/usersSlice';
import useCreateRandomId from '../hooks/useCreateRandomId'

type CreateUserScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const CreateUserScreen: React.FC<CreateUserScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<any>({});
  const [errorCreate, setErrorCreate] = useState('');
  const userList = useAppSelector(state => state.users.objUsers);
  const dispatch = useAppDispatch();
  const { handleCreateRandomId } = useCreateRandomId();
  const nameInput = useRef<TextInput>(null);

  const handleCreateUser = () => {
    let hasErrors = false;
    const newErrors: any = {};
    if (!username.trim()) {
      hasErrors = true;
      newErrors.username = 'Username requerido';
    }

    if (!email.trim()) {
      hasErrors = true;
      newErrors.email = 'Email requerido';
    }

    if (!password.trim()) {
      hasErrors = true;
      newErrors.password = 'Password requerido';
    }

    if (hasErrors) {
      setErrors(newErrors);
      setErrorCreate('');

      return;
    } else {
      const validation: any = userList.find(user => user.email === email);

      if (validation === undefined) {
        dispatch(addUser({ id: handleCreateRandomId(4), username, email, password }));

        setUsername('');
        setPassword('');
        setEmail('');
        setErrors({});
        setErrorCreate('');

        nameInput.current?.focus();
       /*  getRomoveLoginData(); */
        navigation.navigate('UserList');
      } else {
        setErrors({});
        setErrorCreate('The email is already in use! Please choose another one.!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create User</Text>
      <TextInput
        ref={nameInput}
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      {errors.username && <View style={styles.error}><Text style={styles.textError}>{errors.username}</Text></View>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        keyboardType="email-address"
      />
      {errors.email && <View style={styles.error}><Text style={styles.textError}>{errors.email}</Text></View>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {errors.password && <View style={styles.error}><Text style={styles.textError}>{errors.password}</Text></View>}
      {errorCreate && <View style={styles.error}><Text style={styles.textError}>{errorCreate}</Text></View>}
      <Button title="Create user" onPress={handleCreateUser} />
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
  textError: {
    color: 'red'
  },
  error: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default CreateUserScreen;
