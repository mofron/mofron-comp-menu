# mofron-comp-menu
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

menu component for mofron 

## Feature
 - configure the displayed contents when users click the menu by "contents" parameter
 - "horizon" parameter is config that is horizontal menu item or vertical menu item

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

contents sample:
```html
<require>
    <tag module="mofron-comp-text">Text</tag>
    <tag module="mofron-comp-menu">Menu</tag>
    <tag module="mofron-comp-txtframe">TxtFrame</tag>
</require>

<Menu size="3rem","0.4rem" horizon=true>
    <contents>@conts1,@conts2,@conts3</contents>
    <item>
        <TxtFrame>menu 1</TxtFrame>
        <TxtFrame>menu 2</TxtFrame>
        <TxtFrame>menu 3</TxtFrame>
    </item>
</Menu>

<Text name=conts1>contents 1</Text>
<Text name=conts2>contents 2</Text>
<Text name=conts3>contents 3</Text>
```

# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | horizon | boolean | set/unset horizontal mode |
| | select | number | select menu item index |
| | selectEvent | function | select event function |
| | | mixed | select event parameter |
| ◯  | item | array/component | menu items |
| | offset | string (size) | offset value |
| | contents | string/component/array | string: objkey[name] of contents |
| | | | component: component object |
| | | | array: objkey[name] or component list |

