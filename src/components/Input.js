import React from 'react';
import { TextInput } from 'react-native';
import { styles } from '../styles/typography';

const Input = ({ placeholder, secureTextEntry, value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize='none'
        />
    );
};

export default Input;
