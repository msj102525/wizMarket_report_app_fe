import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fonts } from '../../assets/fonts';
import { UserProfileProps } from '../../types';

const UserProfile: React.FC<UserProfileProps> = ({ name, avatar }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.avatar}>{avatar}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        alignItems: 'center',
    },
    name: {
        marginTop: 8,
        fontSize: 50,
        fontFamily: fonts.medium,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default UserProfile;