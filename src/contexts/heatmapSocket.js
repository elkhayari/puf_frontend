export function createHeatmapWebSocket() {
  const heatmapSocket = new WebSocket('ws://127.0.0.1:8089/ws/heatmap/');

  heatmapSocket.addEventListener('open', () => {
    console.log('Heatmap WebSocket connection established');
  });

  heatmapSocket.addEventListener('close', () => {
    console.log('Heatmap WebSocket connection closed');
  });

  return heatmapSocket;
}
