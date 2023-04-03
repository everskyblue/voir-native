<p align="center" style="text-align:center">
<img src="https://raw.githubusercontent.com/everskyblue/voir-native/main/logo-voir.png" alt="voir native" title="voir native">
</p>
<h1 align="center">Voir Native</h1>
<p align="center">It is a framework to develop android and ios applications in a more organized way with tabrisjs</p>

<br>


## Documentation

- [getting started](#getting-started)
  - [installation](#installation)
- [helpers view](#helpers-view)
  - [addView](#addview)
  - [menuDrawer](#menudrawer)
- [popup](#popup)
  - [Toast](#toast)
  - [Modal](#modal)
- [helpers storage](#helpers-storage)
  - [setPreference](#setpreference)
  - [getValuePreference](#getvaluepreference)
  - [existsKeyPreference](#existskeypreference)
- [components](#components)
  - [PreferenceScreen](#preferencescreen)
    - [SwitchPreference](#preference)
    - [CheckBoxPreference](#preference)
    - [ListPreference](#listpreference)
    - [TextPreference](#textpreference)
  - [CoordinatePage](#coordinatepage)

## Getting Started

when installing **voir-native** installs with the dependency of [tabrisjs](https://github.com/eclipsesource/tabris-js/) you can go to the [documentation](https://docs.tabris.com/latest/) of **tabrisjs** and see the entire list of widgets, services and more.

### Installation

execute command

```bash
npm i voir-native
```

## Helpers View

### addView

addView function adds views to the **[CoordinatePage](#coordinatepage)**

| parameter types
|:--
| **...Array<tabris.Action \| tabris.Page>**

#### example

```typescript
import addView, { CoordinatePage } from "voir-native";
import { Action, Page, contentView } from "tabris";

contentView.append(<CoordinatePage layoutData="stretch" />);

addView(<Action title="setting" />, <Page title="setting" stretch />);
```

### menuDrawer

| parameter types
|:--
| Array\<**_IMenuItemOption_**\>

```typescript
interface IMenuItemOption {
  id: string;
  text: string;
  image?: string;
}
```

#### example

```typescript
import { menuDrawer } from "voir-native";
import { drawer } from "tabris";

drawer.enabled = true;

menuDrawer([
  {
    text: "home",
    id: "home",
    image: "/images/home.png",
  },
  {
    text: "favorite",
    id: "favorite",
    image: "/images/favorite.png",
  },
  {
    text: "configure",
    id: "config",
    image: "/images/settings.png",
  },
]);
```

## popup

displays as a popup element in the user interface

### Toast

show popup message with duration time

| method           | parameter types |
| ---------------- | --------------- |
| contructor       | string, number  |
| static makeToast | string, number  |
| show             |                 |
#### example
```typescript
import { Toast } from "voir-native";

Toast.makeText("hello");
```

### Modal

displays a popup that represents a view


| method           | parameter types | return
| ---------------- | --------------- |-----------------
| addView          | ...Widget[]     | 
| setButtonCancel  | string          | tabris.Listeners
| setButtonAccept  | string          | tabris.Listeners
| remove           |
| removeView       |
| removeButtons    |
| show             |
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

añade nuevo datos de preferencia

| parameter types
|:--
| string
| any

### getValuePreference

recupera el valor de preferencia

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

- **ListPreference**
- **SwitchPreference**
- **CheckBoxPreference**

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
  ListPreference,
} from "voir-native";
import { contentView } from "tabris";

contentView.append(
  PreferenceScreen({
    layoutData: "stretch",
  }).append(
    TextPreference({
      title: "text info",
      summary: "summary",
    }),
    SwitchPreference({
      title: "title",
      summary: "summary",
      key: "keySwitch",
      value: true,
    }),
    CheckBoxPreference({
      title: "title",
      summary: "summary",
      key: "cbPreference",
      value: false,
    }),
    ListPreference({
      title: "my list preference",
      key: "list",
      value: 0, // default value select
      entries: [{ id: "myId", text: "item 1" }],
    })
  )
);
```

## CoordinatePage

handles the elements of a current page

```javascript
import { CoordinatePage } from "voir-native";

import { contentView } from "tabris";

contentView.append(
  CoordinatePage({
    layoutData: "stretch",
    drawerActionVisible: true,
  })
);

// or

contentView.append(<CoordinatePage layoutData="stretch" />);
```

<br><br>

> new features will be added little by little
