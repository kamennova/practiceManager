module.exports = {
    "roots": [
        "<rootDir>"
    ],
    "testMatch": [
        "<rootDir>/__tests__/**/*.+(ts|tsx)",
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "/node_modules/", "/cypress/"
    ],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/__tests__/tsconfig.json'
        }
    }
};
