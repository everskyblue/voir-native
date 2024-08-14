
<p align="center" style="text-align:center">
<img src="https://raw.githubusercontent.com/everskyblue/voir-native/main/logo-voir.png" alt="voir native" title="voir native">
</p>
<h1 align="center">Voir Native</h1>
<p align="center">It is a framework to develop android and ios applications in a more organized way with tabrisjs</p>

<br>

## Documentation

-   [video example](#video-example)
-   [getting started](#getting-started)
    -   [installation](#installation)
-   [Voir](#voir)
-   [helpers view](#helpers-view)
    -   [addView](#addview)
    -   [setMenuDrawer](#setmenudrawer)
-   [popup](#popup)
    -   [Toast](#toast)
    -   [Modal](#modal)
-   [helpers storage](#helpers-storage)
    -   [setPreference](#setpreference)
    -   [getValuePreference](#getvaluepreference)
    -   [existsKeyPreference](#existskeypreference)
-   [components](#components)
    -   [PreferenceScreen](#preferencescreen)
        -   [SwitchPreference](#preference)
        -   [CheckBoxPreference](#preference)
        -   [ListPreference](#listpreference)
        -   [TextPreference](#textpreference)
    -   [CoordinatePage](#coordinatepage)
    -   [DrawerMenu](#drawermenu)
        -   [DrawerMenuItem](#drawermenuitem)

## Getting Started

when installing **voir-native** installs with the dependency of [tabrisjs](https://github.com/eclipsesource/tabris-js/) you can go to the [documentation](https://docs.tabris.com/latest/) of **tabrisjs** and see the entire list of widgets, services and more.

### Installation

execute command

```bash
npm i voir-native
```
## Voir
It is an object with 2 properties that helps render more friendly without invoking the [addView](#addview) function
<br>
**Voir.Render** It is an abstract class that has to be inherited. It has as abstract methods the _render_ that returns a page and the _renderAction_ that returns an array action collection.
<br>
**Voir.factory** It helps that the class is invoked as a function.

## Helpers View

### addView

addView function adds views to the **[CoordinatePage](#coordinatepage)**

| parameter types
|:--
| **...Array<tabris.Action \| tabris.Page>**

#### example

```typescript
import { addView, CoordinatePage } from "voir-native";
import { Action, Page, contentView } from "tabris";

contentView.append(<CoordinatePage layoutData="stretch" />);

addView(<Action title="setting" />, <Page title="setting" stretch />);
```

### setMenuDrawer

| parameter types
|:--
| Array\<**_MenuItemOption_**\>

```typescript
interface MenuItemOption {
    id: string;
    text: string;
    image?: string;
}
```

#### example

```typescript
import { setMenuDrawer } from "voir-native";
import { drawer } from "tabris";

drawer.enabled = true;

setMenuDrawer(
    [
        {
            text: "home",
            id: "home",
            image: "/images/home.png"
        },
        {
            text: "favorite",
            id: "favorite",
            image: "/images/favorite.png"
        },
        {
            text: "configure",
            id: "config",
            image: "/images/settings.png"
        }
    ],
    menu => console.log(menu)
);
```

## popup

displays as a popup element in the user interface

### Toast

show popup message with duration time

| method           | parameter types |
| ---------------- | --------------- |
| constructor       | string, number  |
| static makeText | string, number  |
| show             |                 |

#### example

```typescript
import { Toast } from "voir-native";

Toast.makeText("hello", 2000).show();

```
static methods: **SHORT | MEDIUM | LONG**

### Modal

displays a popup that represents a view

| method          | parameter types | return           |
| --------------- | --------------- | ---------------- |
| addView         | ...Widget[]     |
| setButtonCancel | string          | tabris.Listeners |
| setButtonAccept | string          | tabris.Listeners |
| remove          |
| removeView      |
| removeButtons   |
| show            |

#### example

```typescript
import { Modal } from "voir-native";
import {TextView} from "tabris";

const modal = new Modal();

modal.addView(
    <TextView text="this is my text" />
);

modal.setButtonCancel("cancel").addListener(() => {
    modal.remove();
});

modal.setButtonAccept("accept").addListener(() => {
    modal.remove();
});

modal.show();
```

## helpers storage

### setPreference

Add new preference data

| parameter types
|:--
| string
| any

### getValuePreference

Recover the value of preference

| parameter types | return |
| :-------------- | ------ |
| string          | any    |

### existsKeyPreference

comprueba si existe la preferencia

| parameter types | return  |
| :-------------- | ------- |
| string          | boolean |

## Components

### Preference

to add preferences where data can be saved in which the user preference persists

properties received by default to:

-   **ListPreference**
-   **SwitchPreference**
-   **CheckBoxPreference**

| property | type                        |
| -------- | --------------------------- |
| title    | string                      |
| summary  | string                      |
| key      | string                      |
| value    | string \| boolean \| number |
| onSelect | (event: any)=> any          |

### PreferenceScreen

create preference page

### ListPreference

create a modal displaying a view of options to select

received aditional property

| property | type     |
| -------- | -------- |
| entries  | IEntry[] |

```typescript
interface IPropertyListPreference extends IPropertyChildPreference {
    entries: IEntry[];
}

interface IEntry {
    text: string;
    id: string;
}
```

### TextPreference

| property | type               |
| -------- | ------------------ |
| title    | string             |
| summary  | string             |
| onSelect | (event: any)=> any |

### Example

```javascript
import {
    PreferenceScreen,
    TextPreference,
    SwitchPreference,
    CheckBoxPreference,
    ListPreference
} from "voir-native";
import { contentView } from "tabris";

contentView.append(
    PreferenceScreen({
        layoutData: "stretch"
    }).append(
        TextPreference({
            title: "text info",
            summary: "summary"
        }),
        SwitchPreference({
            title: "title",
            summary: "summary",
            key: "keySwitch",
            value: true
        }),
        CheckBoxPreference({
            title: "title",
            summary: "summary",
            key: "cbPreference",
            value: false
        }),
        ListPreference({
            title: "my list preference",
            key: "list",
            value: 0, // default value select
            entries: [{ id: "myId", text: "item 1" }]
        })
    )
);
```

## CoordinatePage

handles the elements of a current page

```javascript
import { CoordinatePage } from "voir-native";

import { contentView, TextView } from "tabris";

const menuLeft = ()=> {
    return (
        <DrawerMenu>
            <DrawerMenuItem text="hola" id="oi" />
            <DrawerMenuItem text="77" id="re"/>
        </DrawerMenu>
    )
}

const menuItemSelected = (item) => {
    console.log('pressed id '+ item.id)
}

const drawerItemSelected = (item) => {
    console.log('pressed drawerItemSelected id '+ item.id)
}

contentView.append(
  CoordinatePage({
    layoutData: "stretch",
    drawerActionVisible: true,
    menuDrawer={menuLeft()}
    contentDrawer={<TextView text="content" />}
    onDrawerItemSelected={drawerItemSelected}
    onActionSelect={menuItemSelected}
  })
);

// or

contentView.append(<CoordinatePage layoutData="stretch" />);
```

## DrawerMenu
It is a wrapper for DrawerMenuItem. Only works for JSX as it provides a more user-friendly way to create a menu.
The drawermenu property is used in CoordinatePage

### DrawerMenuItem
Go into the DrawerMenu component and define the *id*, *text*, *image* properties.

```jsx
<DrawerMenu>
	<DrawerMenuItem
		text=""
		image=""
		id=""
	/>
</DrawerMenu>
```

## Video Example

https://github.com/user-attachments/assets/91232486-11bb-4f71-a2dd-f0fd3be67bb2


<br><br>

> new features will be added little by little
