import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';

type EquipmentItem = {
  id: string;
  equipmentName1: string;
  equipmentName2: string;
  status: string;
  serialNumber: string;
  location: string;
};

const equipmentData: EquipmentItem[] = [
  {
    id: '1',
    equipmentName1: '2800 BASE UNIT',
    equipmentName2: 'W/ VUCAPTURE',
    status: 'OPEN',
    serialNumber: 'RL0010F3511FC9',
    location: 'OR 5',
  },
  {
    id: '2',
    equipmentName1: '2800 BASE UNIT',
    equipmentName2: 'W/ VUCAPTURE',
    status: 'OPEN',
    serialNumber: 'RL0023A12345B6',
    location: 'OR 7',
  },
  {
    id: '3',
    equipmentName1: '2800 BASE UNIT',
    equipmentName2: 'W/ VUCAPTURE',
    status: 'OPEN',
    serialNumber: 'RL0023A12345B6',
    location: 'OR 7',
  },
  {
    id: '4',
    equipmentName1: '2800 BASE UNIT',
    equipmentName2: 'W/ VUCAPTURE',
    status: 'OPEN',
    serialNumber: 'RL0023A12345B6',
    location: 'OR 7',
  },
];

const EquipmentList: React.FC = () => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const renderItem = ({ item }: { item: EquipmentItem }) => (
    <SafeAreaView style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.header,
          expandedItemId === item.id && styles.expandedHeader, // Change background color if expanded
        ]}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={styles.status}>{item.status}</Text>
        <View style={{ marginLeft: -100 }}>
          <Text style={styles.equipmentName}>{item.equipmentName1}</Text>
          <Text style={styles.equipmentName}>{item.equipmentName2}</Text>
        </View>
        <Text style={styles.expandIcon}>
          {expandedItemId === item.id ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expandedItemId === item.id && (
        <View>
          <View style={styles.details}>
            <View style={[styles.detailRow, { padding: 10 }]}>
              <Text style={styles.detailLabel}>S/N:</Text>
            </View>
            <View style={[styles.detailRow, { borderLeftWidth: 1, padding: 10 }]}>
              <Text style={styles.detailValue}>{item.serialNumber}</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View style={[styles.detailRow, { padding: 10 }]}>
              <Text style={styles.detailLabel}>LOCATION:</Text>
            </View>
            <View style={[styles.detailRow, { borderLeftWidth: 1, padding: 10 }]}>
              <Text style={styles.detailValue}>{item.location}</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );

  return (
    <View style={{ marginTop: 100 }}>
      <View>
        <View>
          <Text
            style={{
              color: '#1e90c9',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            SCHEDULED PREVENTIVE
          </Text>
          <Text
            style={{
              color: '#1e90c9',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            MAINTENANCE
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 18,
            paddingLeft: 20,
            backgroundColor: '#e0e0de',
            width: '100%',
            marginTop: 10,
          }}
        >
          <View>
            <Text>STATUS</Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <Text>ENQUERY</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={equipmentData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  expandedHeader: {
    backgroundColor: '#d3d3d3', // Gray background for expanded items
  },
  status: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  equipmentName: {
    flex: 1,
    marginLeft: 10,
    color: '#1e90c9',
    fontWeight: '500',
    fontSize: 13,
  },
  expandIcon: {
    fontSize: 18,
    color: '#999',
  },
  details: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#cfd0d1',
    flexDirection: 'row',
  },
  detailRow: {
    width: '38%',
    borderColor: '#cfd0d1',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailValue: {
    flex: 1,
  },
});

export default EquipmentList;





// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import Table from './Table';

// type EquipmentItem = {
//   id: string;
//   equipmentName1: string;
//   equipmentName2: string;
//   status: string;
//   serialNumber: string;
//   location: string;
// };

// const equipmentData: EquipmentItem[] = [
//   {
//     id: '1',
//     equipmentName1: '2800 BASE UNIT',
//     equipmentName2: 'W/ VUCAPTURE',
//     status: 'OPEN',
//     serialNumber: 'RL0010F3511FC9',
//     location: 'OR 5',
//   },
//   {
//     id: '2',
//     equipmentName1: '2800 BASE UNIT',
//     equipmentName2: 'W/ VUCAPTURE',
//     status: 'OPEN',
//     serialNumber: 'RL0023A12345B6',
//     location: 'OR 7',
//   },
//   {
//     id: '3',
//     equipmentName1: '2800 BASE UNIT',
//     equipmentName2: 'W/ VUCAPTURE',
//     status: 'OPEN',
//     serialNumber: 'RL0023A12345B6',
//     location: 'OR 7',
//   },
//   {
//     id: '4',
//     equipmentName1: '2800 BASE UNIT',
//     equipmentName2: 'W/ VUCAPTURE',
//     status: 'OPEN',
//     serialNumber: 'RL0023A12345B6',
//     location: 'OR 7',
//   },
// ];

// const EquipmentList: React.FC = () => {
//   const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

//   const toggleExpand = (id: string) => {
//     setExpandedItemId(prevId => (prevId === id ? null : id));
//   };

//   const renderItem = ({item}: {item: EquipmentItem}) => (
//     <SafeAreaView style={styles.itemContainer}>
//       <TouchableOpacity
//         style={styles.header}
//         onPress={() => toggleExpand(item.id)}>
//         <Text style={styles.status}>{item.status}</Text>
//         <View style={{marginLeft:-100}}>
//         <Text style={styles.equipmentName}>{item.equipmentName1}</Text>
//         <Text style={styles.equipmentName}>{item.equipmentName2}</Text>
//         </View>
//         <Text style={styles.expandIcon}>
//           {expandedItemId === item.id ? '▲' : '▼'}
//         </Text>
//       </TouchableOpacity>
//       {expandedItemId === item.id && (
//         <View>
//         <View style={styles.details}>
//           <View style={[styles.detailRow, { padding:10}]}>
//             <Text style={styles.detailLabel}>S/N:</Text>
//           </View>
//           <View style={[styles.detailRow, {borderLeftWidth:1, padding:10}]}>
//             <Text style={styles.detailValue}>{item.serialNumber}</Text>
//           </View>
//         </View>
//         <View style={styles.details}>
//           <View style={[styles.detailRow, { padding:10}]}>
//             <Text style={styles.detailLabel}>LOCATION:</Text>
//           </View>
//           <View style={[styles.detailRow, {borderLeftWidth:1,  padding:10}]}>
//             <Text style={styles.detailValue}>{item.location}</Text>
//           </View>
//         </View>
//         </View>
        
//       )}
//     </SafeAreaView>
//   );

//   return (
//     <View style={{marginTop:100}}>
//       <View>
//         <View>
//           <Text style={{color:'#1e90c9', fontSize:14, fontWeight:'bold', textAlign:'center'}}>SCHEDULED PREVENTIVE</Text>
//           <Text style={{color:'#1e90c9', fontSize:14, fontWeight:'bold', textAlign:'center'}} >MAINTENANCE</Text>
//         </View>
//         <View style={{flexDirection:'row', padding:18, paddingLeft:20, backgroundColor:'#e0e0de', width:'100%', marginTop:10}}>
//           <View>
//             <Text>STATUS</Text>
//           </View>
//           <View style={{marginLeft:40}}>
//             <Text>ENQUERY</Text>
//           </View>
//         </View>
//       </View>
//       <FlatList
//         data={equipmentData}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     margin: 10,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   status: {
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   equipmentName: {
//     flex: 1,
//     marginLeft: 10,
//     color:'#1e90c9',
//     fontWeight:'500',
//     fontSize:13
//   },
//   expandIcon: {
//     fontSize: 18,
//     color: '#999',
//   },
//   details: {
//     backgroundColor: '#f0f0f0',
//     borderWidth:1,
//     borderColor:'#cfd0d1',
//     flexDirection: 'row',
//   },
//   detailRow: {
//     // flexDirection: 'row',
//     // marginBottom: 5,
//     width:'38%',
//     borderColor:'#cfd0d1',
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   detailValue: {
//     flex: 1,
//   },
// });

// export default EquipmentList;
