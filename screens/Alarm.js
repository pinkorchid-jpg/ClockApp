import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

export default function Alarm() {
    const [alarmTime, setAlarmTime] = useState('');
    const [notificationPermission, setNotificationPermission] = useState(false);

    useEffect(() => {
        checkNotificationPermissions();
    }, []);

    const checkNotificationPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus === 'granted') {
                setNotificationPermission(true);
            }
        } else {
            setNotificationPermission(true);
        }
    };

const handleSetAlarm = async () => {
    if (!alarmTime) {
        Alert.alert('Error', 'Please enter a valid time for the alarm.');
        return;
    }

    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(alarmTime)) {
        Alert.alert('Error', 'Invalid time format. Please use HH:MM format.');
        return;
    }

    const now = new Date();
    const currentTimeStamp = now.getTime();

    const [hours, minutes] = alarmTime.split(':').map(Number);
    const alarmTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).getTime();

    if (alarmTimestamp <= currentTimeStamp) {
        Alert.alert('Error', 'Please set the alarm time in the future.');
        return;
    }

    const timeUntilAlarm = alarmTimestamp - currentTimeStamp;


    if (!notificationPermission) {
        Alert.alert('Error', 'Notification permissions are not granted. Please grant permission to set alarms.');
        return;
    }


    try {
        await scheduleNotification(timeUntilAlarm);
        Alert.alert('Success', 'Alarm set successfully!');
    } catch (error) {
        Alert.alert('Error', 'Failed to set alarm. Please try again later.');
    }
};

// hjvhgvhjhkj

const scheduleNotification = async (timeUntilAlarm) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Alarm',
            body: 'Your alarm is ringing!',
        },
        trigger: {
            seconds: timeUntilAlarm / 1000,
        },
    });
};


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Alarm</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter time (HH:MM)"
                keyboardType="numbers-and-punctuation"
                value={alarmTime}
                onChangeText={setAlarmTime}
            />
            <TouchableOpacity style={styles.button} onPress={handleSetAlarm}>
                <FontAwesome name="bell" size={24} color="white" />
                <Text style={styles.buttonText}>Set Alarm</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
});