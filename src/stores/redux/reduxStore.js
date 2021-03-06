import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice.js'
import conversReducer from './slices/conversSlice.js'
import messagesReducer from './slices/messagesSlice.js'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import myMiddleware from './middleware/myMiddleware.js'

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
}

const authPersistConfig = {
  ...persistCommonConfig,
  key: 'auth',
  whitelist: ['isLoggedIn', 'userInfo'],
}

export const reduxStore = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    convers: conversReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([myMiddleware]),
})

persistStore(reduxStore)
