import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ErrorMessage({ message }) {
    return (
        <View>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: 5,
    }
});