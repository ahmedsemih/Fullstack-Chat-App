import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

var initialState = {
  selectedChannel: '',
  lastSeen: Cookies.get('last_seen') || '',
  refresh: false
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setLastSeen: (state, action: PayloadAction<any>) => {
      state.lastSeen = action.payload.lastSeen;
      Cookies.set('last_seen', action.payload.lastSeen);
    },
    setSelectedChannel: (state, action: PayloadAction<any>) => {
      state.selectedChannel = action.payload.channelId;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    }
  }
});

export const { setLastSeen, setSelectedChannel, setRefresh } = channelSlice.actions;
export default channelSlice.reducer;
