const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
	return path.join(__dirname, dir);
}

// const testUrl = 'http://192.168.0.244:9004'
const testUrl = 'https://paytest.ryyes.com'
// const testTraning = 'http://192.168.0.244:7003'
const testTraning = 'https://paytest.ryyes.com/training/admin'
module.exports = {
	// publicPath: '/',
	publicPath: '/admin/',
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require('os').cpus().length > 1,

	css: {
		extract: isProduction,
		sourceMap: false,
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/css/common.scss";`
			}
		}
	},

	devServer: {
		port: 9000,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/dev': {
				target: testUrl,
				changeOrigin: true,
				pathRewrite: {
					'^/dev': '/api'
				}
			},
			'/training': {
				target: isProduction ? '/training/admin' : testTraning,
				// target: "http://127.0.0.1:7003",
				changeOrigin: true,
				pathRewrite: {
					'^/training': '/'
				}
			},
			'/pro': {
				target: 'https://mb.ntzycm.cn',
				changeOrigin: true,
				pathRewrite: {
					'^/pro': '/api'
				}
			}
		}
	},

	chainWebpack: (config) => {
		// svg
		config.module.rule('svg').uses.clear();

		config.module
			.rule('svg-sprite-loader')
			.test(/.svg$/)
			.exclude.add(/node_modules/)
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: '[name]'
			});

		// 去掉元素之间空格
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap((options) => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			})
			.end();

		if (isProduction) {
			config.performance.set('hints', false);

			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial'
					},
					commons: {
						name: 'chunk-cool',
						test: resolve('src/cool'),
						minChunks: 3,
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
		}
	}
};
