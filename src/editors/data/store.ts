import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevToolsLogOnlyInProduction } from '@redux-devtools/extension';
import { createLogger } from 'redux-logger';

import { actions, selectors, buildRootReducer, type EditorState } from './redux';

export interface EditorStore extends redux.Store<EditorState> {
  /**
   * Generic editor-plugin hook: lets an editor plugin register its own reducer
   * slice (keyed by block type) at runtime, e.g. right before its editor component
   * first renders (see ../Editor.tsx). Editor plugins live in separate packages
   * that import selectors/actions from './redux', so this module cannot statically
   * import a plugin to read its reducer up front without creating a circular
   * dependency — injecting at runtime, after both modules are loaded, avoids that.
   * This is the standard Redux "code-splitting reducers" pattern.
   */
  injectReducer: (key: string, reducer: redux.Reducer) => void;
}

export const createStore = () => {
  const loggerMiddleware = createLogger();

  const middleware = [thunkMiddleware, loggerMiddleware];

  const injectedReducers: Record<string, redux.Reducer> = {};

  const store = redux.createStore<EditorState, any, any, any>(
    buildRootReducer() as any,
    composeWithDevToolsLogOnlyInProduction(redux.applyMiddleware(...middleware)),
  ) as EditorStore;

  store.injectReducer = (key, pluginReducer) => {
    if (injectedReducers[key]) {
      return;
    }
    injectedReducers[key] = pluginReducer;
    store.replaceReducer(buildRootReducer(injectedReducers) as any);
  };

  /**
   * Dev tools for redux work
   */
  if (process.env.NODE_ENV === 'development') {
    (window as any).store = store;
    (window as any).actions = actions;
    (window as any).selectors = selectors;
  }

  return store;
};

const store = createStore();

export default store;
