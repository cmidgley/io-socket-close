import Listener from 'embedded:io/socket/listener';
import TCP from 'embedded:io/socket/tcp';

new Listener({
    port: 1234,
    onReadable() {
        trace('Listener received a connection\n');
        const serverTCPSocket = this.read();
        if (serverTCPSocket === undefined) {
            trace('Listen failed to return socket\n');
            return;
        }
        new TCP({
            from: serverTCPSocket,
            onWritable() {
                trace(
                    'Listerner-side socket ready, closing client-side socket\n'
                );
                this.close();
            },
        });
    },
});

new TCP({
    address: '127.0.0.1',
    port: 1234,
    onError() {
        trace('Success!  Client-side socket was remotely closed\n');
    },
});
