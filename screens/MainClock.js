import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainClock() {
    const [time, setTime] = useState(getCurrentTime());
    const [date, setDate] = useState(getCurrentDate());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
            setDate(getCurrentDate());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function getCurrentTime() {
        const now = new Date();
        return {
            hours: now.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
            minutes: now.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
            seconds: now.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
        };
    }

    function getCurrentDate() {
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.clockContainer}>
                <View style={styles.timeBlock}>
                    <Text style={styles.time}>{time.hours}</Text>
                </View>
                <View style={styles.timeBlock}>
                    <Text style={styles.time}>{time.minutes}</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.secondsContainer}>
                <View style={[styles.timeBlock, styles.smallerTimeBlock]}>
                    <Text style={styles.seconds}>{time.seconds}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E0E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 20,
        alignItems: 'center',
    },
    date: {
        fontSize: 18,
        color: '#333333',
    },
    clockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeBlock: {
        backgroundColor: '#1F1F1F',
        width: 150,
        height: 150,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    smallerTimeBlock: {
        width: 100,
        height: 100,
    },
    time: {
        fontSize: 80,
        color: '#E1E0E5',
    },
    secondsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    seconds: {
        fontSize: 40,
        color: '#E1E0E5',
    },
    separator: {
        height: 2,
        width: '80%',
        backgroundColor: '#333333',
        marginBottom: 10,
    },
});
