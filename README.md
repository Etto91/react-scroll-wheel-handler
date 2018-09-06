# React Scroll Wheel Handler

<!-- [![npm version](https://badge.fury.io/js/wheel-react.svg)](http://badge.fury.io/js/wheel-react) -->

<!-- [![NPM](https://nodei.co/npm/wheel-react.png)](https://nodei.co/npm/wheel-react/) -->

Simple component for handling scroll trackpad, arrow keys, swipe gestures and mouse wheel event.

# Demo

[Live Demo](https://codepen.io/ettore-panini/pen/xaXEmK?editors=1011)

# Usage

1. Install the npm package:

```bash
    npm install --save wheel-react
```

2. Import it:

```javascript
import ReactScrollWheelHandler from "wheel-react";
```

3. Config the component:

```javascript
<ReactScrollWheelHandler
    upHandler={() => console.log("scroll up")}
    downHandler={() => console.log("scroll down")}
>
    ...
</ReactScrollWheelHandler>
```

#Props

-   **upHandler**: Function that is triggered on scroll up
-   **downHandler**: Function that is triggered on scroll down
-   **leftHandler**: Function that is triggered on scroll left
-   **rightHandler**: Function that is triggered on scroll right
-   **customStyle**: Inline styles applied to the container component.
-   **CustomContainerComponent**: Function/Component. It will be rendered in place of the container div.
-   **pauseListeners**: Boolean. isRequired. Default: false. With this props you can block all events from be fired
-   **timeout**: Integer. isRequired. Default: 600. Timeout between scroll.
-   **disableKeyboard**: Boolean. Default: false.

All the other props are passed to the div/component returned.

# Example

```javascript
import React, { Component } from "react";
import ReactScrollWheelHandler from "wheel-react";

class App extends React.Component {
    state = {
        currentIndex: 0,
        colors: ["red", "black", "grey", "blue", "green"]
    };
    nextIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == colors.length - 1) {
            return this.setState({ currentIndex: 0, blockScroll: true });
        }

        return this.setState({
            currentIndex: currentIndex + 1,
            blockScroll: true
        });
    };

    prevIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == 0) {
            return this.setState({
                currentIndex: colors.length - 1,
                blockScroll: true
            });
        }

        return this.setState({
            currentIndex: currentIndex - 1,
            blockScroll: true
        });
    };

    render() {
        const { colors, currentIndex } = this.state;
        return (
            <div>
                <ReactScroll
                    upHandler={this.prevIndex}
                    downHandler={this.nextIndex}
                    pauseListeners={this.state.blockScroll}
                    customStyle={{
                        width: "100%",
                        height: "100vh",
                        backgroundColor: colors[currentIndex],
                        transition: "background-color .4s ease-out"
                    }}
                />
            </div>
        );
    }
}
```
