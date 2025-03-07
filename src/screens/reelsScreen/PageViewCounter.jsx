import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const PageViewCounter = () => {
  const [pageViews, setPageViews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API endpoint
  const API_URL = 'https://your-api-endpoint.com/page-views';

  useEffect(() => {
    fetchPageViews();
    incrementPageView();
  }, []);

  // Fetch page view count
  const fetchPageViews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPageViews(data.views);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching page views:', error);
    }
  };

  // Increment page view count
  const incrementPageView = async () => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment: 1 }),
      });
    } catch (error) {
      console.error('Error incrementing page views:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.text}>Page Views: {pageViews}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PageViewCounter;
