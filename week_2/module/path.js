const path = require('path');

const basename = path.basename('/foo/bar/baz/asdf/quux.html');

// console.log(basename); // quux.html
const ext = path.extname('index.html');
// console.log(ext); // .html

const abs = path.resolve('index.html');
// console.log(abs); 

const relativePath = path.join('baz/asdf', 'quux');
// console.log(relativePath); 

const dirname = path.dirname('/new/page.html')
// console.log(dirname);

const isAbsolute = path.isAbsolute('new/page.html'); // return boolean
// console.log(isAbsolute); // false

const path2 = path.parse('new/page.html'); // return object
// console.log(path2);