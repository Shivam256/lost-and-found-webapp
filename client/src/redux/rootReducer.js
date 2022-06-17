import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './slices/auth';
import item from './slices/items';
import financialHelp from './slices/financialHelp';
import contact from './slices/contact';
import news from './slices/news';

const authPersistConfig = {
    key: 'auth',
    storage,
    keyPrefix: 'redux-',
    blacklist: ['isLoggenIn']
  };

const rootReducer = combineReducers({
    auth:persistReducer(authPersistConfig, auth),
    item:item,
    financialHelp:financialHelp,
    contact:contact,
    news:news
})

export default rootReducer;