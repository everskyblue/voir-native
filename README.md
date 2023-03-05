# Voir Native

It is a framework to develop android and ios applications in a more organized way with tabrisjs

## How To Use

```typescript

import addView, {CoordinatePage, CoordinatePageComponent, menuDrawer} from 'voir-native'
import {contentView} from "tabris"

contentView.append(CoordinatePage({
    layoutData: 'stretch'
}))


menuDrawer(
    {
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
    }
);

// or

contentView.append(
    <CoordinatePageComponent stretch />
)

```
addView function adds views to the CoordinatePage or CoordinatePageComponent

> new features will be added little by little
