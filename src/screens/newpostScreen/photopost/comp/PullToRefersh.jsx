import React, {useState, useCallback} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';

const PullToRefersh = () => {
  const [data, setData] = useState([
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 4'},
    {id: '5', title: 'Item 5'},
  ]);

  // State to manage refreshingg
  const [refreshing, setRefreshing] = useState(false);

  // Function to refresh the data
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // ============ this secon need remove a n d put api in this place ============
    // Simulate a network request
    setTimeout(() => {
      // Add new data or refresh the list
      setData(prevData => [
        ...prevData,
        {
          id: String(prevData.length + 1),
          title: `New Item ${prevData.length + 1}`,
        },
      ]);

      // Stop the refreshing indicator
      setRefreshing(false);
    }, 500); // 2 seconds delay  /// ========== 2000 remove need ============
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
      }}>
      <Text style={{color: 'green'}}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      // Add the refresh control to FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default PullToRefersh;
