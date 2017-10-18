import { createStore, applyMiddleware, Store } from 'redux';
import { logger } from '../middleware';
import rootReducer, { RootState } from '../reducers';
import {composeWithDevTools} from "redux-devtools-extension";

export function configureStore(initialState?: RootState) {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
