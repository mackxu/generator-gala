# generator-gala
## Install
`npm install -g yo`

`npm install -g generator-gala`

## Upgrade
`npm install -g generator-gala`

## Start
### create component
`yo gala:component ./path/componentname`    
```
componentname  
 |---componentname.vue     
 |---index.js      
```
### create page
`yo gala:page ./path/pagename`
```
pagename    
 |---assets/     
 |---ui/
 |---helper/pageConf.js
 |---helper/pageUtils.js
 |---helper/test-api.js     
 |---index.html
 |---App.vue        
 |---main.js
 |---README.md    
```
## Help
`yo --generators` List every installed generators
