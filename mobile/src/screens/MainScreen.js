import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PersonCardStack from '../components/organisms/PersonCardStack';
import Button from '../components/atoms/Button';
import { personService } from '../services/personService';

const MainScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useQuery({
    queryKey: ['recommendedPeople', page],
    queryFn: () => personService.getRecommendedPeople(page, 10),
    keepPreviousData: true,
  });

  const likeMutation = useMutation({
    mutationFn: personService.likePerson,
    onSuccess: () => {
      queryClient.invalidateQueries(['recommendedPeople']);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: personService.dislikePerson,
    onSuccess: () => {
      queryClient.invalidateQueries(['recommendedPeople']);
    },
  });

  const handleSwipeRight = (person) => {
    likeMutation.mutate(person.id);
  };

  const handleSwipeLeft = (person) => {
    dislikeMutation.mutate(person.id);
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage(page + 1);
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (error) {
    Alert.alert('Error', 'Failed to load people');
    return <View style={styles.container} />;
  }

  const people = data?.data || [];

  if (people.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more people to show</Text>
        <Button
          title="View Liked People"
          onPress={() => navigation.navigate('LikedList')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PersonCardStack
        people={people}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default MainScreen;

