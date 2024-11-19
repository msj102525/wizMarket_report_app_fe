import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Details: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details Page</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Details;
