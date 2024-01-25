// BookingForm.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

export interface TimeSlots {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

interface BookingFormProps {
  onSubmit: (name: string, email: string, timeSlot: string) => void;
  onCancel: () => void;
  timeSlots: TimeSlots[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  onCancel,
  timeSlots,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTimeSlotSelect = (id: string) => {
    const selectedSlot = timeSlots.find(slot => slot.id === id);

    if (selectedSlot && selectedSlot.available) {
      setSelectedTimeSlot(selectedSlot.time);
    } else {
      setSelectedTimeSlot('');
    }

    toggleModal();
  };

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || selectedTimeSlot === '') {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    onSubmit(name, email, selectedTimeSlot);
  };

  const handleCancel = () => {
    onCancel();
  };

  const availableTimeSlots = timeSlots.filter(slot => slot.available);

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text>
          {selectedTimeSlot ? selectedTimeSlot : 'Select a Time Slot'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        backdropColor="#3498db"
        backdropOpacity={0.9}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Available Time Slots</Text>
          {availableTimeSlots.map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={styles.modalItem}
              onPress={() => handleTimeSlotSelect(slot.id)}>
              <Text
                style={styles.slotText}>{`${slot.time} - ${slot.date}`}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    padding: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Text color
  },
  modalItem: {
    marginBottom: 10,
  },
  slotText: {
    color: 'black', // Text color
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BookingForm;
