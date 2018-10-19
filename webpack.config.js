const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: '../css/style.css',
  allChunks: true
});

module.exports = {
   entry : "./app/app.js" , // when start will lock at this file  
   output : {
       path : __dirname + "/public",
       filename : "bundle.js"
   }  , 
   module : {
       rules : [
           {
               loader : "babel-loader",
               test : /\.js/
           } , 
           {
               test: /\.css$/ , 
               use :[
                    "style-loader",
                    "css-loader"
                ]
           },
           {
                test: /\.jade$/ ,
                use :[
                    "html-loader",
                    "pug-html-loader"
                ]
            },
           {
            test: /\.scss$/ , 
            use :ExtractTextPlugin.extract([
                 {loader : "css-loader", options: { sourceMap: true }} ,
                 {loader : "sass-loader", options: { sourceMap: true }} ,
             ])
        }
       ]
   },
   plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      files : ['./public/*'],
      server: { baseDir: ['public'] }
    }),
    new ExtractTextPlugin("style.css") , 
    new HtmlWebpackPlugin({
        title: 'My App',
        filename: 'index.html',
        template : './app/index.jade'
    })
  ] ,
  devtool:'source-map'
};
