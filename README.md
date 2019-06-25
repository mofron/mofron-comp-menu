# mofron-comp-menu
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

menu component for mofron 


# Install
```
npm install mofron mofron-comp-menu
```

# Sample
```html
<require>
    <tag module="mofron-comp-txtframe">TxtFrame</tag>
    <tag module="mofron-comp-menu">Menu</tag>
</require>

<script run=init>
let evt = (p1,p2) => { console.log(p2); };
</script>

<Menu selectEvent=evt size="1.5rem","1rem" offset="-0.01rem">
    <item>
        <TxtFrame>menu 1</TxtFrame>
        <TxtFrame>menu 2</TxtFrame>
        <TxtFrame>menu 3</TxtFrame>
    </item>
</Menu>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | horizon | boolean | set/unset horizontal mode |
| | select | number | select menu item index |
| | selectEvent | function | select event function |
| | | mixed | select event parameter |
| | item | array/component | menu items |
| | offset | string (size) | offset value |
| | contents | string/array | objkey of contents |

