const gulp = require('gulp');
const path = require('path');
const webpack = require('gulp-webpack');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

const paths = {
	styles: "src/styles/style.css",
	js: "src/**/*.js",
	dist: 'dist/'
}

gulp.task('css', function() {
	return gulp.src(paths.styles)
		.pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('build', function() {
	return gulp.src(webpackConfig.entry)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['css', 'build'], function() {
	gulp.watch(paths.styles, ['css']);
	gulp.watch(paths.js, ['build']);
});
