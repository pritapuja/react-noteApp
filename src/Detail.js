import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from "react"
import { firebase } from '../config'
import { useNavigation, useRoute } from '@react-navigation/native'

const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.title);

    const handleUpdate = () => {
        if (noteTitle && noteTitle.length > 0) {
            firebase.firestore()
                .collection('notes')
                .doc(route.params.item.id)
                .update({
                    title: noteTitle,
                    note: noteText,
                })
                .then(() => {
                    navigation.navigate('Home');
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    const handleDelete = () => {

        firebase.firestore()
            .collection('notes')
            .doc(route.params.item.id)
            .delete()
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                alert(error);
            })

    }


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Judul</Text>
            <TextInput
                placeholder='Judul'
                value={noteTitle}
                onChangeText={(text) => setNoteTitle(text)}
                style={styles.inputTitle}
            />
            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
                placeholder='Title'
                value={noteText}
                onChangeText={(text) => setNoteText(text)}
                style={styles.inputNote}
                multiline={4}
            />

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.buttonUpdate}
                    onPress={handleUpdate}
                >
                    <Text style={styles.buttonText}>Simpan</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        // alignItems: 'center',
        // backgroundColor: '#fff',

    },
    label: {
        fontSize: 18,
    },
    inputTitle: {
        fontSize: 18,
        // marginTop: 20,
        marginBottom: 10,
        height: 50,
        width: '97%',
        borderColor: '#DDD',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10
    },
    inputNote: {
        fontSize: 18,
        height: 200,
        width: '97%',
        borderColor: '#DDD',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    buttonUpdate: {
        backgroundColor: '#247881',
        color: '#fff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 18

    }

})
