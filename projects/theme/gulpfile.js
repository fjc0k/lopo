const gulp = require('gulp')
const fs = require('fs-extra')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const stylus = require('gulp-stylus')
const { kebabCase } = require('lodash')

gulp.task('clear', () => {
  return fs.emptyDirSync('./dist')
})

gulp.task('modular', ['clear'], () => {
  return gulp.src('src/*.styl')
    .pipe(stylus())
    .pipe(
      postcss([
        require('postcss-modules')({
          generateScopedName(localName, name) {
            name = name.replace(/\.module$/, '')
            name = kebabCase(name)
            localName = kebabCase(localName)
            return [
              'l',
              name,
              name === localName ? '' : localName
            ].filter(v => !!v).join('-')
          }
        }),
        require('autoprefixer')({
          browsers: [
            'iOS >= 7',
            'Android >= 4'
          ]
        })
      ])
    )
    .pipe(gulp.dest('dist/'))
})

gulp.task('concat', ['modular'], () => {
  gulp.src('dist/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(postcss([
      require('cssnano')
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))

  fs.outputJSONSync('./dist/all.json', classNames, {
    spaces: 2
  })
})

gulp.task('default', ['clear', 'modular', 'concat'])
