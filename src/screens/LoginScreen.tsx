import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser } from '../features/login/loginSlice';


type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const userList = useAppSelector(state => state.users.objUsers);
  const loginData = useAppSelector(state => state.login)
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<any>({});
  const [errorLogin, setErrorLogin] = useState('');
  const emailInput = useRef<TextInput>(null);

  const handleLogin = () => {
    let hasErrors = false;
    const newErrors: any = {};

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
      setErrorLogin('');

      return;
    } else {
      const validation: any = userList.find(user => user.email === email && user.password === password)
      if (validation !== undefined) {
        const { username, email } = validation;

        dispatch(loginUser({
          isLoggedIn: true,
          username,
          email,
        }));

        setPassword('');
        setEmail('');
        setErrors({});
        setErrorLogin('');

        emailInput.current?.focus();
        navigation.navigate('App');
      } else {
        setErrors({});
        setErrorLogin('Email or Password incorrect!');
      }
    }
  };

  useEffect(() => {
    console.log("loginData => ", loginData, typeof loginData)
    if (loginData.isLoggedIn && loginData.username !== null && loginData.email !== null) {
      navigation.navigate('App');
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        ref={emailInput}
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
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
      {errorLogin && <View style={styles.error}><Text style={styles.textError}>{errorLogin}</Text></View>}
      <Button title="Login" onPress={() => handleLogin()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: 'red'
  },
  error: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
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

export default LoginScreen;
