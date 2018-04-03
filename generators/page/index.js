var Generator = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('path', {
      type: String,
      required: true,
    });
  }
  prompting() {
    const root = this.options.path;
    this.pageName = root.split(path.sep).pop();
    // 检查是否已经存在
    if (fs.existsSync(path.resolve('./', root))) {
      this.log(`${this.pageName} already exsits!!`);
      return;
    }
    return this.prompt([{
      type    : 'input',
      name    : 'title',
      message : 'Your page title:',
      default : 'Title',
    }]).then((answers) => {
      this.pageTitle = answers.title;
    });
  }
  writing() {
    const root = this.options.path;
    
    this._createDir('ui');
    this._createDir('assets');

    this._writingHtml(root);
    this._writingMain(root);
    this._writingApp(root);

    this._createFile('utils.js', '// pageUtils.js');
    this._createFile('config.js', '// pageConf.js');
    this._createFile('test-api.js', '// test api');
    this._createFile('README.md', `#${this.pageName}`);
  }
  _writingHtml(path) {
    this._copyTpl('index.html', `${path}/index.html`, { title: this.pageTitle });
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
  _createFile(filename, content = '') {
    this.fs.write(`${this.options.path}/${filename}`, content);
  }
  _copyTpl(from, to, templateOptions) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), templateOptions);
  }
};
