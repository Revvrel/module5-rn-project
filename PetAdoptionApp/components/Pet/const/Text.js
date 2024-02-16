import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

const Text = ({ children, style, variant }) => {
    return (
        <NativeText
            style={[
                styles.text,
                style,
                {
                    fontFamily:
                        variant === 'bold' ? 'Poppins-Bold' : 'Poppins-Regular',
                },
            ]}
        >
            {children}
        </NativeText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
});

export default Text;
