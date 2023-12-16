import axios from 'axios';
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/login';

export const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        username: 'spyder',
        password: 'spyder',

    });
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handleSubmit = async () => {
        if (formData.username && formData.password) {
            const headers = {
                Accept: 'application/json',
            };

            console.log(formData)

            try {
                const response = await axios.post('https://skybillserver.vercel.app/login', formData, { headers }
                );
                const { data } = response;
                const { success, message, token, username } = data;
                if (success) {
                    dispatch(login(username))
                    navigation.navigate('Home');
                    // setFormData({
                    //     username: '',
                    //     password: '',
                    // });
                    //alert('Success', 'You are logged in successfully');

                } else {
                    alert('Error', message || 'Login failed');
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('Error submitting form1:', error);
                    console.error('Full error object:', error);

                    console.error('Error response data:', error.response?.data);
                    console.error('Error status:', error.response?.status);

                }

            }

        } else {
            alert("Please fill UserName and Password")
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="UserName"
                onChangeText={(text) => handleChange('username', text)}
                value={formData.username}
            // defaultValue='spyder'
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => handleChange('password', text)}
                value={formData.password}
            //defaultValue='spyder'
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#17202A',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 1,
        paddingBottom: 1,
    },
    heading: {
        fontSize: 18,
        //fontWeight: 'bold',
        marginBottom: 20,
        color: '#1C2833',
        fontWeight: '700',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: "#D5F5E3",
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
        fontWeight: "500",
        borderRadius: 5,

    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    buttonContainer: {
        // marginTop: 15,
        //justifyContent: 'flex-start',
        // alignItems: "flex-start",
        flexDirection: "row",
        width: '100%',
    },
    button: {
        backgroundColor: '#145A32',
        padding: 10,
        borderRadius: 5,
        // marginTop: 10,
        flex: 1,
        marginRight: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "500"
    },

    photoContainer: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        width: '100%',
    },

    photoPreview: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        width: '55%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,

    }

});


