const mix = require('laravel-mix');

mix.webpackConfig({
    output: {
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash].js',
    },
});
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/backend/app.scss', 'public/css/backend')
    .js('resources/js/backend/app.js','public/js/backend')
    .js('resources/js/backend/vue-application.js', 'public/js/backend/vue-application.js')
;

if (mix.inProduction()) {
    mix.version()
        .options({
            // Optimize JS minification process
            terser: {
                cache: true,
                parallel: true,
                sourceMap: true
            }
        });
} else {
    mix.disableNotifications();
    // Uses inline source-maps on development
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });
}

