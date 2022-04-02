import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appSlice'
import conversationsReducer from './conversationsSlice.js'
import currentConverReducer from './currentConverSlice.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
}

const appPersistConfig = {
  ...persistCommonConfig,
  key: 'app',
  whitelist: ['isLoggedIn', 'userInfo'],
}

export const store = configureStore({
  reducer: {
    app: persistReducer(appPersistConfig, appReducer),
    conversations: conversationsReducer,
    currentConver: currentConverReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
