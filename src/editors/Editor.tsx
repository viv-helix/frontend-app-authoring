// Note: there is no Editor.test.tsx. This component only works together with
// <EditorPage> as its parent, so they are tested together in EditorPage.test.tsx
import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';

import * as hooks from './hooks';

import supportedEditors from './supportedEditors';
import type { EditorComponent } from './EditorComponent';
import AdvancedEditor from './AdvancedEditor';
import type { EditorStore } from './data/store';

export interface Props extends EditorComponent {
  blockType: string;
  blockId: string | null;
  learningContextId: string | null;
  lmsEndpointUrl: string | null;
  studioEndpointUrl: string | null;
}

const Editor: React.FC<Props> = ({
  learningContextId,
  blockType,
  blockId,
  lmsEndpointUrl,
  studioEndpointUrl,
  onClose = null,
  returnFunction,
}) => {
  const dispatch = useDispatch();
  const store = useStore() as EditorStore;
  const loading = hooks.useInitializeApp({
    dispatch,
    data: {
      blockId,
      blockType,
      learningContextId,
      lmsEndpointUrl,
      studioEndpointUrl,
    },
  });

  // Generic editor-plugin hook: plugins register editors for a block type via
  // env.config.jsx (`editorPlugins`), so no block-specific code lives in this repo.
  const EditorComponent = supportedEditors[blockType] ?? getConfig().editorPlugins?.[blockType];

  // If the plugin also registers a reducer slice for this block type, inject it
  // into the store now (before the plugin editor renders/connects). This runs as a
  // synchronous side effect during render, which is intentional: Redux's
  // replaceReducer() re-initializes the new slice's default state immediately, so
  // it's already present by the time the plugin's connect()ed component mounts and
  // reads it. See ./data/store.ts `injectReducer` for why this can't be done via a
  // static import instead (it would create a circular dependency with the plugin).
  //
  // The registration is keyed by block type (so we can look it up here), but the
  // plugin's own selectors expect a specific state slice name (e.g. GameEditor
  // reads `state.game`, not `state.games`) — `key` carries that slice name so we
  // inject the reducer under the name the plugin actually expects.
  const pluginReducerEntry = getConfig().editorPluginReducers?.[blockType];
  if (pluginReducerEntry) {
    store.injectReducer(pluginReducerEntry.key, pluginReducerEntry.reducer);
  }

  // Do not load editor until everything is initialized.
  if (loading) {
    return null;
  }

  if (EditorComponent === undefined && blockId) {
    return (
      <AdvancedEditor
        usageKey={blockId}
        onClose={onClose}
      />
    );
  }

  return <EditorComponent onClose={onClose} returnFunction={returnFunction} />;
};

export default Editor;
