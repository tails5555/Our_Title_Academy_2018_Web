import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {rootReducer} from '../reducer';

export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise, ReduxThunk),
        window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducer', () => {
            const nextReducer = require('../reducer');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}