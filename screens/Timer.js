import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CustomTimer() {
    const [remainingTime, setRemainingTime] = useState(0);
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive && remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(interval);
                        
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, remainingTime]);

    const handleStartStop = () => {
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        if (isNaN(totalSeconds) || totalSeconds === 0) {
            alert('Please enter a valid time.');
            return;
        }

        setRemainingTime(totalSeconds * 1000);
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setRemainingTime(0);
        setIsActive(false);
        setHours('0');
        setMinutes('0');
        setSeconds('0');
    };

    return (
        <View style={styles.container}>
            <View style={styles.timerBox}>
                <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
            </View>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.selectedValue}>{hours} hr</Text>
                    <Picker
                        selectedValue={hours}
                        style={styles.picker}
                        onValueChange={(itemValue) => setHours(itemValue)}
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <Picker.Item key={i} label={i.toString()} value={i.toString()} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.selectedValue}>{minutes} min</Text>
                    <Picker
                        selectedValue={minutes}
                        style={styles.picker}
                        onValueChange={(itemValue) => setMinutes(itemValue)}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <Picker.Item key={i} label={i.toString()} value={i.toString()} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.selectedValue}>{seconds} sec</Text>
                    <Picker
                        selectedValue={seconds}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSeconds(itemValue)}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <Picker.Item key={i} label={i.toString()} value={i.toString()} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonBox} onPress={handleStartStop}>
                    <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBox} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    const displayHours = (hours < 10) ? `0${hours}` : hours;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E0E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerBox: {
        backgroundColor: '#333333',
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    timer: {
        fontSize: 40,
        color: 'white',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    pickerWrapper: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    picker: {
        height: 50,
        width: 70,
    },
    selectedValue: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
    },
    pickerLabel: {
        fontSize: 18,
        color: '#333333',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '50%',
    },
    buttonBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        width: 100,
        height: 50,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#E1E0E5',
    },
    lapContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    lapText: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
    },
});
