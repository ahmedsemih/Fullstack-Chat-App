import { io } from 'socket.io-client';
import { API_BASE_URL } from '../utils/constants';

export default io(API_BASE_URL!, {
  autoConnect: true
});
