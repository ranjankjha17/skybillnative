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
        <ScrollView contentContainerStyle={LoginStyles.container}>
            <TextInput
                style={LoginStyles.input}
                placeholder="UserName"
                onChangeText={(text) => handleChange('username', text)}
                value={formData.username}
            />
            <TextInput
                style={LoginStyles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => handleChange('password', text)}
                value={formData.password}
            />
            <View style={LoginStyles.buttonContainer}>
                <TouchableOpacity style={LoginStyles.button} onPress={handleSubmit}>
                    <Text style={LoginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const LoginStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#17202A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 1,
        paddingBottom: 1,
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
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
    },
    button: {
        backgroundColor: '#145A32',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "500"
    },
});


