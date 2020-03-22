import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { connectToDb } from "./src/backend";
import { Main } from "./src/Main";
import { practiceManagerApp } from "./src/reducers";

const store = createStore(practiceManagerApp, applyMiddleware(thunk));

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
