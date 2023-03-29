import Toast from 'react-native-toast-message';

export function SnackBar(text: string) {
    Toast.show({
        type: 'error',
        props: { text },
    });
}

export function dismissSnackBar() {
    Toast.hide();
}