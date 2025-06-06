// import React, {useState} from 'react';
// import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
// import {MultiSelect} from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const data = [
//   {label: 'Motivation', value: '1'},
//   {label: 'Gym', value: '2'},
//   {label: 'Sports', value: '3'},
//   {label: 'Cute girls', value: '4'},
//   {label: 'BTS girls', value: '5'},
//   {label: 'Hot girls', value: '6'},
//   {label: 'Buty parler', value: '7'},
//   {label: 'Mehadi', value: '8'},
// ];

// const MultiSelectComponent = () => {
//   const [selected, setSelected] = useState([]);

//   const renderItem = item => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.selectedTextStyle}>{item.label}</Text>
//         <AntDesign
//           style={[
//             styles.icon,
//             {color: item.selected == '' ? 'black' : 'green'},
//           ]}
//           name="checkcircle"
//           size={20}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <MultiSelect
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         labelField="label"
//         valueField="value"
//         placeholder="Select item"
//         value={selected}
//         dropdownPosition="top"
//         search
//         searchPlaceholder="Search..."
//         maxSelect={2}
//         onChange={item => {
//           setSelected(item);
//         }}
//         renderLeftIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color="black"
//             name="Safety"
//             size={20}
//           />
//         )}
//         renderItem={renderItem}
//         renderSelectedItem={(item, unSelect) => (
//           <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
//             <View style={styles.selectedStyle}>
//               <Text style={styles.textSelectedStyle}>{item.label}</Text>
//               <AntDesign color="red" name="delete" size={18} />
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default MultiSelectComponent;

// const styles = StyleSheet.create({
//   container: {padding: 16},
//   dropdown: {
//     height: 50,
//     backgroundColor: 'white',
//     color: 'black',
//     borderRadius: 12,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,

//     elevation: 2,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   selectedTextStyle: {
//     fontSize: 14,
//     color: 'black',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   item: {
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   selectedStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 14,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     marginTop: 8,
//     marginRight: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,

//     elevation: 2,
//   },
//   textSelectedStyle: {
//     marginRight: 5,
//     fontSize: 16,
//     color: 'black',
//   },
// });
