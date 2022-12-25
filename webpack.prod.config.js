const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								'src/assets/styles/_vars.scss',
							]
						}
					},
				],
			}
		]
	}
};