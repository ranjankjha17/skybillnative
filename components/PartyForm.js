import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { PartyFormList } from './PartyFormList';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, resetStudents } from '../reducers/temp_order';
import uuid from 'react-native-uuid';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadBill } from '../reducers/bill';
import { generateHTMLContent, getPrintBill } from './services/PrintService';
import * as Print from 'expo-print';

export const PartyForm = (props) => {
  const { username } = props
  const bill = useSelector(state => state.bill.bill);
  console.log('bill', bill)
  const students = useSelector(state => state.tempOrder.students);
  const dispatch = useDispatch()
  const uuidValue = uuid.v4();
  const rowId = parseInt(uuidValue.substring(0, 4), 16);

  const [partyformData, setpartyFormData] = useState({
    partyname: '',
    rate: '',
    quantity: '',
    username: username,
    agrnumber: '',
    serialnumber: '',
  });
  const handleChange = (field, value) => {
    setpartyFormData({
      ...partyformData,
      [field]: value,
    });
  };
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

  useEffect(() => {
    loadStoredBill();
  }, []);

  useEffect(() => {
    setpartyFormData((prevData) => ({
      ...prevData,
      agrnumber: bill[0]?.agrnumber || '',
      serialnumber: bill[0]?.serialnumber || '',

    }));
  }, [partyformData.partyname]);

  const handleSubmit = () => {
    if (partyformData.partyname && partyformData.rate && partyformData.quantity) {
      partyformData['rowid'] = rowId
      partyformData['agrnumber'] = bill[0] ? bill[0].agrnumber : ''
      partyformData['serialnumber'] = bill[0] ? bill[0].serialnumber : ''

      console.log(partyformData)
      dispatch(addStudent(partyformData));
      // setpartyFormData({
      //   quantity: '',

      // })
      alert('your data is sent to list')

    } else {
      alert("Please fill all the field")

    }
  }
  const handleSaveData = async () => {
    if (students.length > 0) {
      console.log(students)
      const headers = {
        Accept: 'application/json',
      };

      try {
        const response = await axios.post('https://skybillserver.vercel.app/create-party', students, { headers }
        );
        const { data } = response;
        const { success, message } = data;
        if (success) {
          dispatch(resetStudents())
          AsyncStorage.removeItem('students');

          setpartyFormData({
            partyname: '',
            rate: '',
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
      alert("Your Party Quantity Details is Empty")
    }

  }

  const generateHTMLContent = (data) => {
    // Initialize htmlContent outside the loop
    let htmlContent = '';
    //console.log("printdata",data)
    const organizedData = data.reduce((acc, entry) => {
      const { partyname, quantity, rate, agrnumber, farmername, totalbags } = entry;
      const existingEntry = acc.find((item) => item.partyname === partyname);

      if (existingEntry) {
        existingEntry.quantity.push(quantity);
        existingEntry.totalquantity += parseInt(quantity, 10); // Update totalquantity
      } else {
        acc.push({
          partyname,
          quantity: [quantity],
          totalquantity: parseInt(quantity, 10),
          rate,
        });
      }

      return acc;
    }, []);
    // Calculate remaining quantity
    const totalBags = parseInt(data[0].totalbags, 10);
    const totalQuantitySum = organizedData.reduce((sum, entry) => sum + entry.totalquantity, 0);
    const remainingQuantity = totalBags - totalQuantitySum;

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    // Add current date and time in the first line
    htmlContent += `
    <div style="display: flex; justify-content: space-between;font-size:1px;">
      <div style="display: flex; justify-content: space-between;"><p>Date</p> <p>${formattedDate}</p></div>
      <div style="display: flex; justify-content: space-between;"><p>Time</p> <p>${formattedTime}</p></div>
    </div>
  `;

    // Add agrnumber, farmername, and totalbags
    htmlContent += `
    <div style="font-size:1px;">
         <div style="display: flex; justify-content: space-between;"><p>AGR Number</p> <p>${data[0].agrnumber}</p></div>
         <div style="display: flex; justify-content: space-between;"><p>Farmer Name</p> <p>${data[0].farmername}</p></div>
         <div style="display: flex; justify-content: space-between;"><p>Total Bags</p> <p>${data[0].totalbags}</p></div>
         <div style="border-bottom: 1px solid black;"></div>
    </div>
  `;

    // Use forEach instead of map, and append to htmlContent directly
    organizedData.forEach((entry, index) => {
      htmlContent += `
      <div style="margin-bottom: 2px;font-size:1px;border-bottom: 1px solid black;">
      <div style="display: flex; justify-content: space-between;"><p>Party Name :</p> <p>${entry.partyname}</p></div>
      <div style="display: flex; justify-content: space-between;"><p>Rate :</p> <p>${entry.rate}</p></div>
      <div style="display: flex; flex-wrap: wrap;">
      <p style="margin-right: 1px;">Quantity:</p>
      ${entry.quantity.map((qty, index) => (
        `<p style="margin-left: 22px;">${qty}</p>${(index + 1) % 4 === 0 ? '<br />' : ''}`
        
      )).join('')}
    </div>
          <div style="display: flex; justify-content: space-between;"><p>Total :</p> <p>${entry.totalquantity}</p></div>
      </div>`;
    });

    // Add remaining quantity
    htmlContent += `
    <div style="font-size:1px;">
      <div style="display: flex; justify-content: space-between;"><p>Remaining Quantity</p> <p>${remainingQuantity}</p></div>
    </div>
  `;

    return htmlContent;
  };

  const handlePrint = async () => {

    try {
      if (bill[0]?.agrnumber) {
        const printBillData = await getPrintBill(bill[0]?.agrnumber)
        //  console.log('printbill', printBillData)
        const htmlContent = generateHTMLContent(printBillData);
        await Print.printAsync({ html: htmlContent });
      }else{
        alert("Please, Input AGRNumber")
      }

    } catch (error) {
      console.error('Error printing:', error.messge);
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.heading}>Party Form</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Party Name"
          onChangeText={(text) => handleChange('partyname', text)}
          value={partyformData.partyname}
        />
        <TextInput
          style={styles.input}
          placeholder="Rate"
          onChangeText={(text) => handleChange('rate', text)}
          value={partyformData.rate}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          onChangeText={(text) => handleChange('quantity', text)}
          value={partyformData.quantity}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSaveData} >
            <Text style={styles.buttonText}>New Party</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePrint} >
            <Text style={styles.buttonText}>Print</Text>
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
    paddingBottom: 5,
    paddingTop: 10,

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
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    backgroundColor: "#EAFAF1",
    fontWeight: "500"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#145A32',
    padding: 10,
    borderRadius: 5,
    marginTop: 1,
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

