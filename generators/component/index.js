const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('cpath', {
      type: String,
      required: true,
    });
  }
  writing() {
    const cpath = path.resolve('.', this.options.cpath);
    const cname = cpath.split(/(\\|\/)/).pop();
    // 检查文件是否已存在
    if (this.fs.exists(path.resolve(cpath, 'index.js'))) {
      this.log(`component ${cname} already exsits!!`);
      return;
    }
    this.fs.copyTpl(
      this.templatePath('component.vue'),
      this.destinationPath(`${cpath}/${cname}.vue`),
      { cname }
    );
    this.fs.write(`${cpath}/index.js`, `export { default } from './${cname}';`);
    this.fs.write(`${cpath}/README.md`, `# ${cname}`);
  }
};
