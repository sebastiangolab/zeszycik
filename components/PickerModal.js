import React, { useState } from 'react';
import { Modal, StyleSheet, View, Icon, Text } from 'react-native';

const PickerModal = () => {
    const [visible, setVisible] = useState(true);
    const [title, setTitle] = useState('test');
    const [items, setItems] = useState([1, 2, 3, 4]);
    const [initialValue, setInitialValue] = useState(5);

    return (
        <Modal animated transparent visible={visible} animationType="fade">
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <View style={styles.header}>
                        <Text>{'ikona1'}</Text>
                        <Text>{title || ''}</Text>
                        <Text>{'ikona2'}</Text>
                    </View>
                    {/* <Picker selectedValue={initialValue} onValueChange={(value) => setInitialValue(value)}>
                        {items.map(item => (
                            <Picker.Item value={item} label={item} />
                        ))}
                    </Picker> */}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    pickerContainer: {
        height: 200,
        width: '100%',
        backgroundColor: 'white'
    },

    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
    }
});

export default PickerModal;