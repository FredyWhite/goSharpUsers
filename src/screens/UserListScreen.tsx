import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../app/hooks';

const UserListScreen = () => {
  const userList = useAppSelector(state => state.users.objUsers);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}> User List </Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`User: ${item.username}`}</Text>
            <Text>{`User email: ${item.email}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  containerTitle: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    display: 'flex',
    marginTop: 15,
  },
  userItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    display: 'flex',
    width: '100%'
  },
});

export default UserListScreen;
