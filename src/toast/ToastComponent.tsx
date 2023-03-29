import React from 'react';
import { Text, View } from 'react-native';
import styles from './ToastStyle';

export default function ToastComponent(props:any) {
    return (
        <View style={styles.container}>
            <Text numberOfLines={2} style={styles.text}>
                {props.text}
            </Text>
        </View>
    );
}