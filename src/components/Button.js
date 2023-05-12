import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/typography';

const Button = ({ title, onPress, type }) => {
    return (
        <TouchableOpacity style={type === 'Button' && styles.button} onPress={onPress}>
            <Text style={type === 'Button' ? styles.buttonText : styles.staticButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
