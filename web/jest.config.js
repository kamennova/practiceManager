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
    ]
};
