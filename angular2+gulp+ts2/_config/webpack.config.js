const path = require('./path');
const browserslist = require('./browserslist');
module.exports = {
    watch: false,
    resolve: {
        alias: {}
    },
    entry: {
        bundle: path.SRC.JS + '/entry.js'
    },
    output: {
        path: path.DEST.JS + '/js/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [[
                                'es2015',
                                {
                                    'targets': {'browsers': browserslist},
                                    'loose': true,
                                    'modules': false
                                }
                            ]],
                            plugins: [
                                'transform-proto-to-assign',
                                'transform-object-assign'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devtool: '#eval-source-map'
};