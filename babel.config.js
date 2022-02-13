module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '14'
				},
				useBuiltIns: 'usage',
				corejs: {
					version: 3,
					shippedProposals: true
				}
			}
		],
		'@babel/preset-typescript'
	],
	sourceType: 'unambiguous',
	plugins: ['@babel/plugin-transform-typescript'],
	ignore: ['core-js/']
};
