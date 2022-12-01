import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer/rootReducer';
import appApi from './services/appApi';

//persist our store
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [appApi.reducerPath],
};

//persist our store

const persistedReducers = persistReducer(persistConfig, rootReducer);

//creating the store

const store = configureStore({
  reducer: persistedReducers,
  middleware: [thunk, appApi.middleware],
});

export default store;
