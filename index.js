/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/index';
import App from './App';
import client from './src/ApolloClient';

const Root = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </ApolloProvider>
);

// Render the Root component
AppRegistry.registerComponent(appName, () => Root);
