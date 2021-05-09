module.exports = {
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
				test: /\.(png|jpe?g|gif|woff|woff2)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
};
