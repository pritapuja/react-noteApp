import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from "react"
import { useNavigation, useRoute } from '@react-navigation/native'
import { firebase } from '../config';
import { FlashList } from "@shopify/flash-list";
import { Entypo } from '@expo/vector-icons';


const Home = () => {
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        firebase.firestore()
            .collection('notes')
            .onSnapshot((querySnapshot) => {
                const newNotes = [];
                querySnapshot.forEach((doc) => {
                    const { note, title } = doc.data();
                    newNotes.push({ note, title, id: doc.id });
                })
                setNotes(newNotes);
            });
    }, []);



    const handleDelete = (id) => {

        firebase.firestore()
            .collection('notes')
            .doc(id)
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
            {/* <Text>Home</Text> */}
            <FlashList
                data={notes}
                numColumns={2}
                estimatedItemSize={100}
                renderItem={({ item }) => (
                    <View style={styles.noteView}>
                        <Pressable
                            onPress={() => navigation.navigate('Detail', { item })}
                        >
                            <Text style={styles.noteTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.noteDescription}>
                                {item.note}
                            </Text>
                        </Pressable>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                width={100}
                                style={styles.buttonUpdate}
                                onPress={() => navigation.navigate('Detail', { item })}
                            >
                                <Text style={styles.buttonText}>Ubah</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                width={100}
                                style={styles.buttonDelete}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.buttonText}>Hapus</Text>
                            </TouchableOpacity>

                        </View>

                    </View>


                )}
            />
            {/* <Button title='Add Notes' onPress={() => navigation.navigate('NoteAdd')} /> */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('NoteAdd')}
            >
                <Entypo name='plus' size={45} color='black' />

            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noteView: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#DDD',
        borderWidth: 2,
        elevation: 7,
        alignItems: 'center'
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold,'
    },
    noteDescription: {
        fontSize: 16,
        marginTop: 5
    },
    button: {
        position: 'absolute',
        bottom: 60,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 7
    },


    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '97%'
    },
    buttonUpdate: {
        backgroundColor: '#FFC300',
        color: '#151D3B',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonDelete: {
        backgroundColor: '#D82148',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        fontWeight: '600',
        color: '#000',
        fontSize: 12

    }

})
