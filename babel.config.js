module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '14.1.1'
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
	plugins: ['const-enum', '@babel/plugin-transform-typescript']
};
