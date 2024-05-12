import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

console.log("Redux store initialized:", store.getState());

export default store;
