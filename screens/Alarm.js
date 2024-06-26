import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

export default function Alarm() {
    const [alarmHour, setAlarmHour] = useState('08');
    const [alarmMinute, setAlarmMinute] = useState('00');
    const [selectedDay, setSelectedDay] = useState('Everyday');
    const [alarms, setAlarms] = useState([]);
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
        if (notificationPermission) {
            const trigger = new Date();
            trigger.setHours(alarmHour);
            trigger.setMinutes(alarmMinute);
            trigger.setSeconds(0);

            if (trigger < new Date()) {
                trigger.setDate(trigger.getDate() + 1);
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Alarm",
                    body: "It's time!",
                },
                trigger: {
                    hour: parseInt(alarmHour),
                    minute: parseInt(alarmMinute),
                    repeats: selectedDay === 'Everyday' || selectedDay === 'Weekdays' || selectedDay === 'Weekends',
                },
            });

            const newAlarm = {
                id: Date.now().toString(),
                hour: alarmHour,
                minute: alarmMinute,
                day: selectedDay,
            };
            setAlarms([...alarms, newAlarm]);

            Alert.alert(
                "Alarm Set",
                `Alarm set for ${alarmHour}:${alarmMinute} on ${selectedDay}`,
                [{ text: "OK" }]
            );
        } else {
            alert('Notification permissions are not granted.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.alarmItem}>
            <Text style={styles.alarmText}>{`Alarm set for ${item.hour}:${item.minute} on ${item.day}`}</Text>
            <TouchableOpacity onPress={() => handleDeleteAlarm(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>

    );
    const handleDeleteAlarm = (id) => {
        const updatedAlarms = alarms.filter(item => item.id !== id);
        setAlarms(updatedAlarms);
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Alarm</Text>
            {/* Time Picker */}
            <View style={styles.timePickerContainer}>
                <View style={[styles.timePickerBox, styles.hourBox]}>
                    <Text style={styles.pickerLabel}>Hour</Text>
                    <Picker
                        selectedValue={alarmHour}
                        style={styles.picker}
                        onValueChange={(itemValue) => setAlarmHour(itemValue)}
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <Picker.Item key={i} label={`${i < 10 ? '0' : ''}${i}`} value={`${i < 10 ? '0' : ''}${i}`} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.spacer}></View>
                <View style={[styles.timePickerBox, styles.minuteBox]}>
                    <Text style={styles.pickerLabel}>Minute</Text>
                    <Picker
                        selectedValue={alarmMinute}
                        style={styles.picker}
                        onValueChange={(itemValue) => setAlarmMinute(itemValue)}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <Picker.Item key={i} label={`${i < 10 ? '0' : ''}${i}`} value={`${i < 10 ? '0' : ''}${i}`} />
                        ))}
                    </Picker>
                </View>
            </View>
            {/* Day Picker */}
            <View style={[styles.pickerContainer, styles.dayBox]}>
                <Text style={styles.pickerLabel}>Day</Text>
                <Picker
                    selectedValue={selectedDay}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedDay(itemValue)}
                >
                    <Picker.Item label="Everyday" value="Everyday" />
                    <Picker.Item label="Weekdays" value="Weekdays" />
                    <Picker.Item label="Weekends" value="Weekends" />
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Tuesday" value="Tuesday" />
                    <Picker.Item label="Wednesday" value="Wednesday" />
                    <Picker.Item label="Thursday" value="Thursday" />
                    <Picker.Item label="Friday" value="Friday" />
                    <Picker.Item label="Saturday" value="Saturday" />
                    <Picker.Item label="Sunday" value="Sunday" />
                </Picker>
            </View>
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.setButton]} onPress={handleSetAlarm}>
                    <Text style={styles.buttonText}>Set Alarm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {/* Alarm List */}
            <FlatList
                data={alarms}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.alarmList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E0E5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 200,
        marginBottom: 20,
    },
    timePickerContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    timePickerBox: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#333333',
    },
    spacer: {
        width: 10, // ช่องว่างระหว่างกล่องเวลาและกล่องนาที
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#333333',
    },
    pickerLabel: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        color: 'white', // เปลี่ยนสีข้อความใน Picker ให้เป็นสีขาว
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    setButton: {
        backgroundColor: '#333333',
    },
    cancelButton: {
        backgroundColor: '#FF5733',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    alarmList: {
        width: '100%',
        marginTop: 20,
    },
    alarmItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    alarmText: {
        fontSize: 16,
    },
    deleteButton: {
        color: '#FF5733',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
