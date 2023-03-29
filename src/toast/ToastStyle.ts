import { Dimensions, StyleSheet } from 'react-native';

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        textAlign: 'left',
        textAlignVertical: 'center',
        maxWidth: deviceWidth * 0.7,
        color: 'white'

    },

    container: {
        flex: 1,
        flexDirection: 'row',
        width: deviceWidth * 0.85,
        minHeight: 47,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        borderRadius: 4,
        backgroundColor: 'black'
    },

    actionText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default styles;


