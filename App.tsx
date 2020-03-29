import React, { Component } from "react";
import { enableScreens } from 'react-native-screens';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { connectToDb } from "./src/db/connection";
import { Main } from "./src/Main";
import { practiceManagerApp } from "./src/store/reducers";

const store = createStore(practiceManagerApp, applyMiddleware(thunk));
enableScreens();

class App extends Component {
    async componentDidMount() {
        await connectToDb();
    }

    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default App;
