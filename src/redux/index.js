import thunk from 'redux-thunk';
import reducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-community/async-storage';

export const persistConfig = {
    key: "poetry-storage-root",
    storage: AsyncStorage,
    blacklist: ['LoadingReducer'],
}

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)