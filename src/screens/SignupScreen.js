import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../reducers/authReducer';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validate } from '../utils/validation';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { styles } from '../styles/typography'

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();
    const customerData = useSelector(state => state.auth.user);

    useEffect(() => {
        console.log(customerData);
    }, []);

    const dispatch = useDispatch();

    const handleSignup = () => {
        // Perform signup logic here
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
            // if (email === customerData.email && password === customerData.password) {
                
            // } else {
                
            // }
            const user = { email, password };
            dispatch(signup(user));
            setEmail('');
            setPassword('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
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
