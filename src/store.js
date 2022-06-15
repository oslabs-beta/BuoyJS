import reducers from './reducers/combineReducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({reducer: reducers});

export default store;