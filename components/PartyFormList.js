import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent,loadStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PartyFormList = () => {
  const students = useSelector(state => state.tempOrder.students);
const dispatch=useDispatch()
   console.log("data",students)
   async function loadStoredStudents() {
    try {
      const studentsData = await AsyncStorage.getItem('students');
      if (studentsData) {
        dispatch(loadStudents(JSON.parse(studentsData)));
      }
    } catch (error) {
      console.log( error.message);
    }
  }
  useEffect(() => {   
    loadStoredStudents();
  }, []);
  const handleDeleteStudent = rowId => {
    dispatch(deleteStudent(rowId));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Party Quantity Details</Text>
      <View style={styles.formRow}>
      <Text style={styles.grid_heading}>ROW ID</Text>
        <Text style={styles.grid_heading}>Party Name</Text>
        <Text style={styles.grid_heading}>Quantity</Text>
        <Text style={styles.grid_heading}>SL Number</Text>
        <Text style={styles.grid_heading}></Text>
      </View>
      <ScrollView>
      {students?.map(student => (
        <ScrollView key={student?.rowid} contentContainerStyle={styles.formRow}>
          <Text style={styles.grid_label}>{student?.rowid}</Text>
          <Text style={styles.grid_label}>{student?.partyname}</Text>
          <Text style={styles.grid_label}> {student?.quantity}</Text>
          <Text style={styles.grid_label}>{"1"}</Text>
          {/* <Button
            title="Delete"
            onPress={() => handleDeleteStudent(student?.rowId)}
          /> */}
          <View style={styles.button_area}>
          <Text style={styles.button_delete} onPress={() => handleDeleteStudent(student?.rowid)}>Delete</Text>
          </View>
        </ScrollView>
      ))}
    </ScrollView>
</ScrollView> 
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      //  alignItems: 'center',
      // justifyContent: 'center',
        // padding: 16,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:1,
        paddingBottom:10,  
  
      },
  
    formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginBottom: 8,  
    },
    grid_label: {
      flex: 1,
      fontSize: 10,
      color: '#04070b',
      fontWeight: '700',

    },
    grid_heading: {
      flex: 1,
      fontSize: 10,
      fontWeight: '700',
      color: '#2E4053'
    },
    heading: {
      flex: 1,
      fontSize: 18,
      color: '#1C2833',
      fontWeight: '700',
       // marginLeft: 80,
      marginBottom: 5,
      textAlign:"center"
     // marginTop: 16,
    },
    button_delete:{
      flex: 1,
      fontSize: 12,
      color: '#E74C3C',
      fontWeight: '500',
    },
    button_area:{
      backgroundColor:'#eeffff',
      padding:5
    }
  });