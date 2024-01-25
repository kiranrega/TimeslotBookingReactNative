// TimeSlotList.tsx
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TimeSlots} from './BookingForm';

interface TimeSlotListProps {
  onSelect: (id: string) => void;
  timeslots: TimeSlots[];
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({onSelect, timeslots}) => {
  return (
    <FlatList
      data={timeslots}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelect(item.id)}
          style={[
            styles.timeSlot,
            {backgroundColor: item.available ? '#3498db' : '#e74c3c'},
          ]}
          disabled={!item.available}>
          <Text
            style={[
              styles.timeSlotText,
              {color: item.available ? 'white' : 'rgba(255,255,255,0.5)'},
            ]}>
            {item.time}
          </Text>
          <Text
            style={[
              styles.timeSlotText,
              {color: item.available ? 'white' : 'rgba(255,255,255,0.5)'},
            ]}>
            {item.date}
          </Text>
          <Text
            style={[
              styles.availabilityText,
              {color: item.available ? 'white' : 'rgba(255,255,255,0.5)'},
            ]}>
            {item.available ? 'Available' : 'Booked'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  timeSlot: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  availabilityText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default TimeSlotList;
