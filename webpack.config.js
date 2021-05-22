module.exports = {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.css$/i,

				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
				// test: /\.(png|jpe?g|gif|woff|woff2|eot)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
						},
					},
				],
			},
		],
	},
};
