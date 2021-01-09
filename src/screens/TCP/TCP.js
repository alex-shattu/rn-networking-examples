import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import net from 'react-native-tcp';

class TCP extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      port: String((Math.random() * 60536) | (0 + 5000)),
      req: 'Hello from client',
      res: 'Hello from server',
    };

    this.server = null;
    this.client = null;
  }
  destroyAll = () => {
    this.server = null;
    this.client = null;
  };

  componentWillUnmount() {
    this.destroyAll();
  }

  addLog = (text) => {
    this.setState(({ logs }, props) => ({
      logs: [...logs, text],
    }));
  };

  destroyAll = () => {};

  run = () => {
    const { port, res, req } = this.state;

    // Server
    const server = net
      .createServer((socket) => {
        this.addLog(`Server created on ${JSON.stringify(socket.address())}\n`);
        // Socket
        socket
          .on('close', () => {
            this.addLog('Socket "close" event\n');
          })
          .on('ready', () => {
            this.addLog('Socket "ready" event\n');
          })
          .on('data', (data) => {
            this.addLog(`Socket "data" event - ${data?.toString()}`);
            socket.write(`${res}\r\n`);
          })
          .on('error', (error) => {
            this.addLog(`Socket "error" event - ${error}`);
          });
      })
      .on('close', () => {
        this.addLog('Server "close" event\n');
      })
      .on('error', (error) => {
        this.addLog(`Server "error" event - ${error}\n`);
      })
      .listen(+port, () => {
        this.addLog(`Server started on ${JSON.stringify(server.address())}\n`);
      });

    // Client
    const client = net
      .createConnection(+port, () => {
        this.addLog(`Client connected on ${JSON.stringify(client.address())}\n`);
        client.write(`${req}\r\n`);
      })
      .on('error', (error) => {
        this.addLog(`Client "error" - ${error}\n`);
      })
      .on('data', (data) => {
        this.addLog(`Client "data" event - ${data?.toString()}`);
        this.client?.destroy(); // kill client after server's response
        this.server?.close();
      })
      .on('close', () => {
        this.addLog('Client "close" event\n');
      });

    this.server = server;
    this.client = client;
  };

  render() {
    const { logs, req, res, port } = this.state;
    const { t } = this.props;
    return (
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <Input
            label={t('port')}
            style={styles.input}
            value={port}
            onChange={({ nativeEvent: { text } }) => {
              this.setState({ port: text });
            }}
          />
          <Input
            multiline
            numberOfLines={3}
            label={t('request_body')}
            style={styles.input}
            value={req}
            onChange={({ nativeEvent: { text } }) => {
              this.setState({ req: text });
            }}
          />
          <Input
            multiline
            numberOfLines={3}
            label={t('response_body')}
            style={styles.input}
            value={res}
            onChange={({ nativeEvent: { text } }) => {
              this.setState({ res: text });
            }}
          />
          <Button style={styles.button} title={t('run')} onPress={this.run} />
          <Text h4>{t('logs')}</Text>
          {logs.map((log, i) => (
            <Text key={i}>{log}</Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default withTranslation()(TCP);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    paddingBottom: 5,
  },
  button: {
    paddingBottom: 5,
  },
});
