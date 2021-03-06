/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
 * It also has a little runtime which is connected to the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your configuration
 * you will be able to get live reloads when doing changes to your files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
 * altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state
 * while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */
/* eslint-disable no-var */
require('babel-core/register');

// Webpack config for development
import webpack from 'webpack';
import path from 'path';
import pkg from '../../package.json';
import banner from '../banner';
import WebpackNotifierPlugin from 'webpack-notifier';
import config from '../config';

module.exports = {
    // entry points 
    entry: config.sourceDir,
    cache: true,
    debug: true,
    output: {
        path: config.distDir,
        filename: config.dev,
        libraryTarget: 'umd',
        library: config._app
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.join(__dirname, '../../src'),
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner),
        new webpack.DefinePlugin({
            '__DEV__': true,
            'process.env.NODE_ENV': JSON.stringify('development'),
            VERSION: JSON.stringify(pkg.version)
        })
    ],
    eslint: {
        configFile: config.eslintDir
    }
};