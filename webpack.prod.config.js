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
					"sass-loader"
				],
			}
		]
	}
};