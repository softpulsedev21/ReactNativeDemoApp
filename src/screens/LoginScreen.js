import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../reducers/authReducer';
import { Text, View } from 'react-native';
import { styles } from '../styles/typography'
import Input from '../components/Input';
import Button from '../components/Button';
import { validate } from '../utils/validation';
import ErrorMessage from '../components/ErrorMessage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const customerData = useSelector(state => state.auth.user);

  console.log(customerData);

  const dispatch = useDispatch();

  const handleLogin = () => {
    // Perform login logic here
    const emailValidation = validate(email, { required: true, email: true });
    const passwordValidation = validate(password, { required: true, minLength: 6 });
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.errorMessage);
    } else {
      setEmailError('');
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.errorMessage);
    } else {
      setPasswordError('');
    }

    if (emailValidation.isValid && passwordValidation.isValid) {
      const user = { email, password };
      dispatch(login(user));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {emailError !== '' && <ErrorMessage message={emailError} />}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {passwordError !== '' && <ErrorMessage message={passwordError} />}
      <Input
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} type='Button' />
      <View style={styles.flexRowContainer}>
        <Text style={styles.linkText}>Don't have account ?</Text>
        <Button title="Click here to signup" onPress={() => navigation.navigate('Signup')} type='StaticLink' />
      </View>
    </View>
  );
};

export default LoginScreen;
