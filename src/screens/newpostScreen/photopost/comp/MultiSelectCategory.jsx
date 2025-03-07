import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

const categories = [
  {id: '1', name: 'Sports'},
  {id: '2', name: 'Music'},
  {id: '3', name: 'Movies'},
  {id: '4', name: 'Tech'},
  {id: '5', name: 'Travel'},
  {id: '6', name: 'Food'},
  {id: '7', name: 'Movies'},
  {id: '8', name: 'Tech'},
  {id: '9', name: 'Travel'},
  {id: '10', name: 'Food'},
  {id: '11', name: 'Sports'},
  {id: '12', name: 'Music'},
  {id: '13', name: 'Movies'},
  {id: '14', name: 'Tech'},
  {id: '15', name: 'Travel'},
  {id: '16', name: 'Food'},
  {id: '17', name: 'Movies'},
  {id: '18', name: 'Tech'},
  {id: '19', name: 'Travel'},
  {id: '20', name: 'Food'},
  {id: '21', name: 'Sports'},
  {id: '22', name: 'Music'},
  {id: '23', name: 'Movies'},
  {id: '24', name: 'Tech'},
  {id: '25', name: 'Travel'},
  {id: '26', name: 'Food'},
  {id: '27', name: 'Movies'},
  {id: '28', name: 'Tech'},
  {id: '29', name: 'Travel'},
  {id: '30', name: 'Food'},
  // Add more categories as needed
];

const MultiSelectCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const MAX_SELECTION = 3; // Set the limit to 4 categories

  // Filter categories based on search text
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSelectCategory = category => {
    if (selectedCategories.some(item => item.id === category.id)) {
      // Remove category if it's already selected
      setSelectedCategories(prev =>
        prev.filter(item => item.id !== category.id),
      );
    } else {
      // Check if selection limit is reached
      if (selectedCategories.length < MAX_SELECTION) {
        setSelectedCategories(prev => [...prev, category]);
      } else {
        Alert.alert(
          'Selection Limit',
          `You can only select up to ${MAX_SELECTION} categories.`,
        );
      }
    }
  };

  const renderCategory = ({item}) => {
    const isSelected = selectedCategories.some(cat => cat.id === item.id);
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          isSelected ? styles.selectedCategoryItem : null,
        ]}
        onPress={() => handleSelectCategory(item)}>
        <Text style={isSelected ? styles.selectedText : styles.categoryText}>
          {item.name}
        </Text>
        {isSelected ? (
          <Text style={{color: 'white', marginLeft: 10}}>X</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderTopCategorySelected = ({item}) => {
    const isSelected = selectedCategories.some(cat => cat.id === item.id);
    return (
      <View style={{height: 65}}>
        <TouchableOpacity
          style={[
            styles.categoryItemTop,
            isSelected ? styles.selectedCategoryItemTop : null,
          ]}
          onPress={() => handleSelectCategory(item)}>
          <Text style={isSelected ? styles.selectedText : styles.categoryText}>
            {item.name}
          </Text>
          {isSelected ? (
            <Text style={{color: 'white', marginLeft: 10}}>X</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 25, color: 'green', alignSelf: 'center', margin: 20}}>
        Choose Category for video{' '}
      </Text>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories"
        placeholderTextColor={'black'}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Display Selected Categories at the Top */}
      <FlatList
        data={selectedCategories}
        keyExtractor={item => item.id}
        horizontal
        renderItem={renderTopCategorySelected}
        contentContainerStyle={styles.categoryList}
      />

      {/* Display Filtered Categories */}
      <View style={styles.categoriesContainer}>
        {filteredCategories.map(item => renderCategory({item}))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryItem: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  categoryItemTop: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'blue',
  },
  selectedCategoryItem: {
    backgroundColor: '#4CAF50',
  },
  selectedCategoryItemTop: {
    backgroundColor: 'blue',
  },
  categoryText: {
    color: '#333',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedCategoryDisplay: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  categoryList: {
    paddingBottom: 20,
  },
});

export default MultiSelectCategory;
