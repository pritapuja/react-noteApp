import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from "react"
import { firebase } from '../config';
import { set } from 'firebase/database';
import { settings } from 'firebase/analytics';

const NoteAdd = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleAdd = () => {
        firebase.firestore()
            .collection('notes')
            .add({
                title, note,
            })
            .then(() => {
                setTitle('')
                setNote('')
                Keyboard.dismiss();
            })
            .catch((error) => {
                alert(error)
            });
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Judul'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.inputTitle}
            />
            <TextInput
                placeholder='Deskripsi'
                value={note}
                onChangeText={(text) => setNote(text)}
                style={styles.inputNote}
                multiline={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleAdd}
            >
                <Text style={styles.buttonText}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoteAdd

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    inputTitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        height: 20,
        width: '97%',
        borderColor: '#DDD',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10
    },
    inputNote: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        height: 200,
        width: '97%',
        borderColor: '#DDD',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#247881',
        borderRadius: 5,
        marginTop: 20,
        height: 55,
        width: '97%',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'

    }

})
