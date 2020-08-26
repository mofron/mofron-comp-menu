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
<setting>
    <tag module="mofron-comp-txtframe">TxtFrame</tag>
    <tag module="mofron-comp-menu">Menu</tag>
</setting>

<Menu offset=-0.01rem horizon=true>
    <item size=(1.5rem,0.5rem)>
        <TxtFrame>menu 1</TxtFrame>
        <TxtFrame>menu 2</TxtFrame>
        <TxtFrame>menu 3</TxtFrame>
    </item>
</Menu>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | horizon | boolean | set/unset horizontal mode |
| | select | number | select menu item index |
| | reselect | boolean | true: call event when items are duplicates selected |
| | | | false: ignored when items are duplicates selected [default] |
| | selectEvent | function | select event function |
| | | mixed | select event parameter |
| ◯  | item | mixed | component: menu items component |
| | | | array: menu items list |
| | offset | string(size) | offset value |
| | mainColor | mixed | string: menu item color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | baseColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | accentColor | mixed | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |

