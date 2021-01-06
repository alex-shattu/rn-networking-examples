import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import net from 'react-native-tcp';

const TCP = () => {
  const [isRunned, setisRunned] = useState('');
  const [port, setPort] = useState('');

  const runServer = useCallback(() => {
    var server = net
      .createServer((socket) => {
        socket.write('excellent!');
      })
      .listen(12345);
  }, []);

  const runClient = useCallback(() => {
    var client = net.createConnection(12345);

    client.on('error', (error) => {
      console.log(error);
    });

    client.on('data', (data) => {
      console.log('message was received', data);
    });
  }, []);

  const handlePortChange = useCallback((value) => {
    setPort(value);
  }, []);

  return (
    <View>
      <Text>TCP</Text>
      <TextInput value={port} onChange={handlePortChange} />
    </View>
  );
};

export default TCP;

const styles = StyleSheet.create({});
