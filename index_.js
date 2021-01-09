import React, { Component } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View } from 'react-native';
import net from 'react-native-tcp';
import { name as appName } from './app.json';

if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  var bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

// global.location = global.location || { port: 80 }
var isDev = typeof __DEV__ === 'boolean' && __DEV__;
process.env.NODE_ENV = isDev ? 'development' : 'production';
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : '';
}

function randomPort() {
  return (Math.random() * 60536) | (0 + 5000); // 60536-65536
}

var serverPort = randomPort();

class RctSockets extends Component {
  constructor(props) {
    super(props);

    this.updateChatter = this.updateChatter.bind(this);
    this.state = { chatter: [] };
  }

  updateChatter(msg) {
    this.setState({
      chatter: this.state.chatter.concat([msg]),
    });
  }

  componentDidMount() {
    let server = net
      .createServer((socket) => {
        this.updateChatter('server connected on ' + JSON.stringify(socket.address()));

        socket.on('data', (data) => {
          this.updateChatter('Server Received: ' + data);
          socket.write('Echo server\r\n');
        });

        socket.on('error', (error) => {
          this.updateChatter('error ' + error);
        });

        socket.on('close', (error) => {
          this.updateChatter('server client closed ' + (error ? error : ''));
        });
      })
      .listen(serverPort, () => {
        this.updateChatter('opened server on ' + JSON.stringify(server.address()));
      });

    server.on('error', (error) => {
      this.updateChatter('error ' + error);
    });

    server.on('close', () => {
      this.updateChatter('server close');
    });

    let client = net.createConnection(serverPort, () => {
      this.updateChatter('opened client on ' + JSON.stringify(client.address()));
      client.write(
        `GET / HTTP/1.1
Host: site.com
`,
      );
    });

    client.on('data', (data) => {
      this.updateChatter('Client Received: ' + data);

      this.client.destroy(); // kill client after server's response
      this.server.close();
    });

    client.on('error', (error) => {
      this.updateChatter('client error ' + error);
    });

    client.on('close', () => {
      this.updateChatter('client close');
    });

    this.server = server;
    this.client = client;
  }

  componentWillUnmount() {
    this.server = null;
    this.client = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.chatter.map((msg, index) => {
            return (
              <Text key={index} style={styles.welcome}>
                {msg}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent(appName, () => RctSockets);
