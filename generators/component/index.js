var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('cname', {
      type: String,
      required: true,
    });
  }
  writing() {
    const cname = this.options.cname;
    this.fs.copyTpl(
      this.templatePath('component.vue'),
      this.destinationPath(`${cname}/${cname}.vue`),
      { cname }
    );
    this.fs.write(`${cname}/index.js`, `export { default } from './${this.options.cname}'`);
  }
};
