import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validate } from '../utils/validation';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { styles } from '../styles/typography'
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useSelector } from 'react-redux';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();
    const [createUser] = useMutation(CREATE_USER);
    const loginUser = useSelector(state => state.user);

    const handleSignup = () => {
        // Perform signup logic here
        const usernameValidation = validate(username, { required: true });
        const emailValidation = validate(email, { required: true, email: true });
        const passwordValidation = validate(password, { required: true, minLength: 6 });

        if (!usernameValidation.isValid) {
            setUsernameError(usernameValidation.errorMessage);
        } else {
            setUsernameError('');
        }

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

        if (usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
            try {
                createUser({ variables: { username, email, password } })
                    .then((response) => {
                        // Handle successful signup
                        if (response.data.signup !== null) {
                            setUsername('');
                            setEmail('');
                            setPassword('');
                        }
                        Alert.alert('Signup Successful');
                    })
                    .catch((error) => {
                        // Handle signup error
                        Alert.alert('Signup Failed', error.message);
                    });

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            {usernameError !== '' && <ErrorMessage message={usernameError} />}
            <Input
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
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
            <Button title="Signup" onPress={handleSignup} type='Button' />
            <View style={styles.flexRowContainer}>
                <Text style={styles.linkText}>Already have account ?</Text>
                <Button title="Click here to login" onPress={() => navigation.navigate('Login')} type='StaticLink' />
            </View>
        </View>
    );
};

export default SignupScreen;
