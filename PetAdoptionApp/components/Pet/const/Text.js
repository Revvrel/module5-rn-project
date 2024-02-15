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
                        variant === 'bold' ? 'Sk-Modernist-Bold' : 'Sk-Modernist-Regular',
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
