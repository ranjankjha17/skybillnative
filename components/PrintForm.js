import React from 'react';
import { View, Text } from 'react-native';
const data = [
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "Ram",
        "rate": "45",
        "quantity": "5"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "Ram",
        "rate": "45",
        "quantity": "15"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "Ram",
        "rate": "45",
        "quantity": "3"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "shyam",
        "rate": "55",
        "quantity": "2"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "shyam",
        "rate": "55",
        "quantity": "4"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "shyam",
        "rate": "55",
        "quantity": "6"
    },
    {
        "agrnumber": "4567",
        "farmername": "Rita",
        "totalbags": 65,
        "partyname": "Mohan",
        "rate": "65",
        "quantity": "9"
    }
];

export const PrintForm= () => {
  const organizedData = data.reduce((acc, entry) => {
    const { partyname, quantity, rate } = entry;
    const existingEntry = acc.find((item) => item.partyname === partyname);

    if (existingEntry) {
      existingEntry.quantity.push(quantity);
    } else {
      acc.push({
        partyname,
        quantity: [quantity],
        rate,
      });
    }

    return acc;
  }, []);

  // Render the organized data
  const renderData = () => {
    return organizedData.map((entry, index) => (
      <View key={index} style={{ marginBottom: 10 }}>
        <Text>partyname: {entry.partyname}</Text>
        <Text>quantity: {entry.quantity.join(' ')}</Text>
        <Text>rate: {entry.rate}</Text>
      </View>
    ));
  };

  return (
    <View style={{ padding: 20 }}>
      {renderData()}
    </View>
  );
};



