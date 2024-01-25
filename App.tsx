// App.tsx
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {timeSlots} from './src/data';
import Header from './src/Header';
import TimeSlotList from './src/TimeSlotList';
import BookingForm from './src/BookingForm';

const App = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState([
    {id: '1', time: '10:00 AM', date: '2022-01-01', available: true},
    {id: '2', time: '11:00 AM', date: '2022-01-01', available: true},
    // Add more time slots as needed
  ]);

  const handleTimeSlotSelect = (id: string) => {
    const selectedSlot = timeSlots.find(slot => slot.id === id);

    if (selectedSlot && selectedSlot.available) {
      setSelectedTimeSlot(id);
    } else {
      Alert.alert('Error', 'This time slot is not available');
    }
  };

  const handleFormSubmit = (name: string, email: string, timeSlot: string) => {
    // Implement logic for submitting the form, e.g., send to server
    Alert.alert('Success', 'Appointment booked successfully!');
    setSelectedTimeSlot(null);
    const updatedTimeSlots = timeSlots.map(slot => {
      if (slot.time === timeSlot && slot.available) {
        // Update the availability status to false if the slot is available
        return {...slot, available: false};
      }
      return slot;
    });
    setTimeSlots(updatedTimeSlots);
  };

  const handleCancel = () => {
    setSelectedTimeSlot(null);
  };

  return (
    <View style={styles.container}>
      <Header title={'Time Slot Booking'} />
      <TimeSlotList onSelect={handleTimeSlotSelect} timeslots={timeSlots} />
      {selectedTimeSlot && (
        <BookingForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          timeSlots={timeSlots}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default App;
