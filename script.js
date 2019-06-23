/**
 * 用于首页的链接的url;
 * 使用nodejs开发，使用path, fs 模块
 *  */

const fs = require('fs');
const path = require("path");

const dirs = fs.readdirSync(path.join(__dirname));
const data = [];
dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if(fs.statSync(dirPath).isDirectory() && dir !== '.git') {
        const subDirs = fs.readdirSync(path.join(__dirname, dir));
        subDirs.forEach(file => {
            console.log("subDir", file);
            if(file.indexOf('.html') > -1) {
                data.push({
                    title: dir,
                    link: `./${dir}/${file}`
                })
            }
        })
    }
});

fs.writeFileSync(path.join(__dirname, 'data.js'), `var data=`);
fs.appendFileSync(path.join(__dirname, 'data.js'), JSON.stringify(data), 'utf8');
