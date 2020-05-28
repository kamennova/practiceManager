import React, { Component } from "react";
import { enableScreens } from 'react-native-screens';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { setUpDb } from "./src/db/fix/Setup";
import { Main } from "./src/Main";
import { practiceManagerApp } from "./src/store/appReducers";
import { DEFAULT_THEME, getThemeColors, readTheme, recordTheme, Theme, ThemeContext } from "./src/theme";

const store = createStore(practiceManagerApp, applyMiddleware(thunk));
enableScreens();

class App extends Component<{}, { theme: Theme }> {
    state = {
        theme: DEFAULT_THEME,
    };

    async componentDidMount() {
        const theme = await readTheme();

        if (theme !== null) {
            this.setState({ theme });
        } else {
            await this.setTheme(DEFAULT_THEME);
        }

        await setUpDb();
    }

    setTheme = async (theme: Theme) => {
        this.setState({ theme });
        await recordTheme(theme);
    };

    render() {
        return (
            <Provider store={store}>
                <ThemeContext.Provider
                    value={{
                        theme: this.state.theme,
                        setTheme: this.setTheme,
                        colors: getThemeColors(this.state.theme),
                    }}>
                    <Main/>
                </ThemeContext.Provider>
            </Provider>
        );
    }
}

export default App;
