import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {};

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    blacklist: ['auth:loading']
  }
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export const persistor = persistStore(store)

