import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { PartyForm } from '../components/PartyForm';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, loadBill, resetBill } from '../reducers/bill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { resetStudents } from '../reducers/temp_order';

export const Home = (props) => {
    const { username } = props
    // console.log(username)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const bill = useSelector(state => state.bill.bill);
    // console.log(bill)
    // const username = useSelector(state => state.auth.username)
    // const memoizedusername = useMemo(() => username, [username]);
    // console.log('auth', memoizedusername)

    async function loadStoredBill() {
        try {
            const billData = await AsyncStorage.getItem('bill');
            if (billData) {
                dispatch(loadBill(JSON.parse(billData)));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    //   useEffect(() => {   
    //     loadStoredBill();
    //   }, []);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = formatTime(currentTime.getHours());
        const minutes = formatTime(currentTime.getMinutes());
        const seconds = formatTime(currentTime.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    };
    const getSerialNumber = async () => {
        try {
            const { data } = await axios.get('https://skybillserver.vercel.app/get-serialnumber')
            // console.log(data.data)
            const serialnumber = await data.data
            setFormData((prevData) => ({
                ...prevData,
                serialnumber,
            }));
        } catch (error) {
            console.error('Error fetching serial number:', error);
        }

    }

    const [formData, setFormData] = useState({
        serialnumber: '',
        agrnumber: '',
        farmername: '',
        bags: '',
        date: getCurrentDate(),
        time: getCurrentTime(),
        username: username,
    });
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const handleSubmit = async () => {
        if (formData.agrnumber && formData.farmername && formData.bags) {
            const headers = {
                Accept: 'application/json',
            };

            console.log(formData)

            try {
                const response = await axios.post('https://skybillserver.vercel.app/create-bill', formData, { headers }
                );


                const { data } = response;
                const { success, message } = data;

                if (success) {
                    dispatch(addBill(formData))
                    setFormData({
                        farmername: '',
                        bags: '',
                        agrnumber: ''
                    });
                    alert("Your form data is saved")
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
            alert("Please fill all the field")
        }
    }
    // useEffect(() => {

    // }, [username])

    useEffect(() => {
        loadStoredBill();
        getSerialNumber()
        const intervalId = setInterval(() => {
            setFormData((prevData) => ({
                ...prevData,
                time: getCurrentTime(),
                date: getCurrentDate(),
            }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [formData.serialnumber]);

    const handleNewBill = async () => {
        try {
            await AsyncStorage.removeItem('bill');
            dispatch(resetBill())
            dispatch(resetStudents())
            alert("Create a New Bill")
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error handling new bill:', error);
        }
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={{ ...styles.heading, flex: 1 }}>Form</Text>
                    <View style={{ ...styles.buttonContainer, flex: 1 }}>
                        <TouchableOpacity style={styles.button} onPress={handleNewBill} >
                            <Text style={styles.buttonText}>New Bill</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.codeContainer}>
                    <Text style={{ flex: 1, fontWeight: "500" }}>DATE : {formData.date}</Text>
                    <Text style={{ flex: 1, fontWeight: "500" }}>TIME : {formData.time}</Text>
                </View>
                <View style={styles.codeContainer}>
                    <Text style={{ flex: 1, fontWeight: "500" }}>Serial Number : {formData.serialnumber}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="AGR Number"
                    onChangeText={(text) => handleChange('agrnumber', text)}
                    value={formData.agrnumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Farmer Name"
                    onChangeText={(text) => handleChange('farmername', text)}
                    value={formData.farmername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bags"
                    onChangeText={(text) => handleChange('bags', text)}
                    value={formData.bags}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
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
        fontWeight: "500"
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

