# React Scroll Wheel Handler

Simple react component for handling scroll trackpad, arrow keys, swipe gestures and mouse wheel event.

# Demo

[Live Demo](https://codepen.io/ettore-panini/pen/xaXEmK?editors=1011)

# Usage

1. Install the npm package:

```bash
    npm install --save react-scroll-wheel-handler
    or
    yarn add react-scroll-wheel-handler
```

2. Import it:

```javascript
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
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
import ReactScrollWheelHandler from " react-scroll-wheel-handler";

class App extends React.Component {
    state = {
        currentIndex: 0,
        colors: ["red", "black", "grey", "blue", "green"]
    };
    nextIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == colors.length - 1) {
            return this.setState({ currentIndex: 0 });
        }

        return this.setState({
            currentIndex: currentIndex + 1
        });
    };

    prevIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == 0) {
            return this.setState({
                currentIndex: colors.length - 1
            });
        }

        return this.setState({
            currentIndex: currentIndex - 1
        });
    };

    render() {
        const { colors, currentIndex } = this.state;
        return (
            <div>
                <ReactScrollWheelHandler
                    upHandler={this.prevIndex}
                    downHandler={this.nextIndex}
                    customStyle={{
                        width: "100%",
                        height: "100vh",
                        backgroundColor: colors[currentIndex],
                        transition: "background-color .4s ease-out"
                    }}
                >
                    <h1>CIAO</h1>
                </ReactScrollWheelHandler>
            </div>
        );
    }
}
```
