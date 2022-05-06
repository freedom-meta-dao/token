module.exports = {
	testEnvironment: "jest-environment-node-single-context",
	transform: {"^.+\\.(t|j)sx?$": "@swc/jest"},
	testRegex: "(/__test__/.*|(\\.|/)(spec))\\.ts$",
	roots: ["./"],
	coverageDirectory: "./coverage",
	testResultsProcessor: "jest-sonar-reporter",
	coveragePathIgnorePatterns: [
		"test/",
		"node_modules/",
		".node/",
		"jest/",
		"coverage/",
		"webpack.config.js"
	]
};
