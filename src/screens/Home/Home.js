import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import screensNames from '~/constants/screensNames';
import { TouchableOpacity } from 'react-native-gesture-handler';

const list = [
  {
    label: 'TCP',
    name: screensNames.TCP_SCREEN,
  },
  {
    label: 'UDP',
    name: screensNames.UDP_SCREEN,
  },
  {
    label: 'HTTP/HTTPS',
    name: screensNames.HTTP_SCREEN,
  },
  {
    label: 'FTP/SFTP',
    name: screensNames.FTP_SCREEN,
  },
];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView>
        {list.map(({ label, name }) => (
          <View key={name} style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(name);
              }}>
              <Text style={styles.itemTitle}>{label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 18,
  },
});
