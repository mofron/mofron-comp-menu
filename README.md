# mofron-comp-menu
Menu component for [mofron](https://github.com/simpart/mofron).

# Sample
```javascript
require('mofron');
let Text = require('mofron-comp-text');
let Menu = require('mofron-comp-menu');

new Menu({
    child     : [ new Text('menu 1'),
                      new Text('menu 2') ],
    selectEvt : function(menu) {
                          alert('select ' + menu.selectIdx());
                      },
    visible : true
});
```
