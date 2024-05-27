import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Stopwatch = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);
    const startRef = useRef(null);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(2);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleStartStop = () => {
        setIsActive(!isActive);
        if (!isActive) {
            if (startRef.current === null) {
                startRef.current = Date.now() - timer;
            }
            intervalRef.current = setInterval(() => {
                setTimer(Date.now() - startRef.current);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setTimer(0);
        setLaps([]);
        startRef.current = null;
    };

    const handleLap = () => {
        setLaps([...laps, timer]);
    };

    const renderItem = ({ item, index }) => (
        <Text style={styles.lapText}>
            Lap {index + 1}: {formatTime(item)}
        </Text>
    );

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <View style={styles.timerBox}>
                    <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonBox} onPress={handleStartStop}>
                    <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBox} onPress={handleLap} disabled={!isActive}>
                    <Text style={styles.buttonText}>Lap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBox} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={laps}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.lapList}
                contentContainerStyle={styles.lapContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E0E5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    timerBox: {
        backgroundColor: '#333333',
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        borderRadius: 10,
    },
    timerText: {
        fontSize: 70,
        color: '#E1E0E5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        width: 100,
        height: 50,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,
        color: '#E1E0E5',
    },
    lapList: {
        width: '100%',
        marginTop: 20,
    },
    lapContainer: {
        alignItems: 'center',
    },
    lapText: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
    },
});

export default Stopwatch;
