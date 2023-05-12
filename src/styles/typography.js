import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontSizes } from './fontSizes';
import { fontWeights } from './fontWeights';
import { fontStyles } from './fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightGrey,
        // fontFamily: fontFamily,
    },
    title: {
        fontSize: fontSizes.extraLarge,
        fontWeight: fontWeights.bold,
        marginBottom: 32,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        // fontFamily: fontStyles.regular,
        fontSize: fontSizes.medium,
        color: colors.black,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 32,
    },
    buttonText: {
        color: colors.white,
        // fontFamily: fontStyles.bold,
        fontSize: fontSizes.upperMedium,
    },
    error: {
        color: colors.danger,
        // fontStyle: fontStyles.regular,
        fontSize: fontSizes.regular,
        marginTop: 5,
    },
    flexRowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    linkText: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.medium,
        marginRight: 5
    },
    staticButtonText: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: fontWeights.bold
    }
});

export { colors, fontSizes, fontWeights, styles };
