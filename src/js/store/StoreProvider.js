import React from 'react';
import { Provider } from "react-redux";

import configureStore from '../store';

export default function StoreProvider({children}) {
    const store = configureStore();
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}