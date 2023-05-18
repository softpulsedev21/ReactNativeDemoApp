import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../reducers/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persisting state

// Configure persistence options
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persisted store
export const persistor = persistStore(store);