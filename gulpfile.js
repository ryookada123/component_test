// gulpプラグインの読み込み
var gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
var sass = require("gulp-sass");
var sassGlob = require( 'gulp-sass-glob' );
var mmq = require( 'gulp-merge-media-queries' );
var gulpStylelint = require( 'gulp-stylelint' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssdeclsort = require( 'css-declaration-sorter' );


/// cssコンパイル ////////////////////////////////////////////
gulp.task('sass', function() {
  return gulp.src('sass/*.scss')
        .pipe(
          sass({
            outputStyle: "expanded"
          })
            // Sassのコンパイルエラーを表示
            // (これがないと自動的に止まってしまう)
            .on("error", sass.logError)
        )
        // 分割ファイルをまとめる
        .pipe( sassGlob() )
        // ベンダープレフィックス自動化
        .pipe( postcss([ autoprefixer() ]) )
        // アルファベット順
        .pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
        // メディアクエリまとめる
        .pipe( mmq() )
         // 整形ツール
        .pipe(
  gulpStylelint({
    fix: true
  })
  // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
);
});


/// 監視フォルダ ////////////////////////////////////////////
gulp.task('watch', function(){
  gulp.watch('sass/*.scss', gulp.task('sass'));
});
/// Gulpコマンドで動かすもの ////////////////////////////////////////////
gulp.task('default', gulp.task('watch'));
