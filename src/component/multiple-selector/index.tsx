import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Controller } from 'react-hook-form';

interface Item {
  label: string;
  value: string;
}

interface MultiSelectProps {
  title: string;
  name: string;
  control: any;
  items: Item[];
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  name,
  control,
  items,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedValues: string[] = value || [];

        const toggleSelection = (val: string) => {
          const updated = selectedValues.includes(val)
            ? selectedValues.filter((v) => v !== val)
            : [...selectedValues, val];
          onChange(updated);
        };

        const selectedLabels = selectedValues
          .map((val) => items.find((i) => i.value === val)?.label || val)
          .join(', ');

        return (
          <View style={styles.container}>
            {/* Input-like button */}
            <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
              <Text style={styles.inputText}>
                {selectedLabels.length ? selectedLabels : title}
              </Text>
            </Pressable>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
              <View style={styles.modalWrapper}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{title}</Text>

                  {/* Pills in modal */}
                  <View style={styles.pillContainer}>
                    {selectedValues.map((val) => {
                      const label = items.find((i) => i.value === val)?.label || val;
                      return (
                        <View key={val} style={styles.pill}>
                          <Text style={styles.pillText}>{label}</Text>
                          <TouchableOpacity onPress={() => toggleSelection(val)}>
                            <MaterialIcons name='close' size={16} color="white" />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>

                  <FlatList
                    data={items}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => {
                      const selected = selectedValues.includes(item.value);
                      return (
                        <Pressable
                          style={[styles.option, selected && styles.selectedOption]}
                          onPress={() => toggleSelection(item.value)}
                        >
                          <View style={styles.optionRow}>
                            <View style={styles.radioOuter}>
                              {selected && <View style={styles.radioInner} />}
                            </View>
                            <Text style={selected ? styles.selectedLabel : styles.label}>
                              {item.label}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    }}
                  />

                  <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Done</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputText: { color: '#333' },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '95%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    position:'absolute',
    bottom:0
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#007AFF33',
  },
  label: { fontSize: 16, marginLeft: 8 },
  selectedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom:10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    color: 'white',
    marginRight: 6,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});
