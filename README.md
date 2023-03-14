# Voir Native

It is a framework to develop android and ios applications in a more organized way with tabrisjs

## How To Use

```javascript
import addView, {
    CoordinatePage,
    CoordinatePageComponent,
    menuDrawer,
} from "voir-native";
import { contentView } from "tabris";

contentView.append(
    CoordinatePage({
        layoutData: "stretch",
    })
);

menuDrawer({
    one: {
        text: "home",
        id: "home",
        image: "/images/home.png",
    },
    thwo: {
        text: "favorite",
        id: "favorite",
        image: "/images/favorite.png",
    },
    three: {
        text: "configure",
        id: "config",
        image: "/images/settings.png",
    },
});

// or

contentView.append(<CoordinatePageComponent stretch />);
```

addView function adds views to the CoordinatePage or CoordinatePageComponent

#### Preferences

to add preferences where data can be saved in which the user preference persists. import these components:

```javascript
import {
    PreferenceScreen,
    TextPreference,
    SwitchPreference,
    CheckBoxPreference,
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
        })
    )
);
```

you can use it with jsx. all classes end at the end with the word **Component** you can also use it without that ending

> new features will be added little by little
