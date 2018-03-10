var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('path', {
      type: String,
      required: true,
    });
  }
  writing() {
    const path = this.options.path;
    this._createDir('ui');
    this._createDir('assets');

    this._writingHtml(path);
    this._writingMain(path);
    this._writingApp(path);

    this._createFile('utils.js');
    this._createFile('test-api.js');
  }
  _writingHtml(path) {
    this._copyTpl('index.html', `${path}/index.html`, { title: path });
  }
  _writingMain(path) {
    this._copyTpl('main.js', `${path}/main.js`);
  }
  _writingApp(path) {
    this._copyTpl('c.vue', `${path}/App.vue`, { cname: 'App' });
  }
  _createDir(dir) {
    this.fs.write(`${this.options.path}/${dir}/.gitkeep`, '');
  }
  _createFile(filename) {
    this.fs.write(`${this.options.path}/${filename}`, '');
  }
  _copyTpl(from, to, templateOptions) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), templateOptions);
  }
};
