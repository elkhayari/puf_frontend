export function createWebSocket() {
  const socket = new WebSocket('ws://127.0.0.1:8089/ws/devices/');

  socket.addEventListener('open', () => {
    console.log('WebSocket connection established');
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
  });

  return socket;
}
