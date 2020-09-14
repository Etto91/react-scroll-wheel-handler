# React Scroll Wheel Handler

[![npm version](https://badge.fury.io/js/react-scroll-wheel-handler.svg)](http://badge.fury.io/js/react-scroll-wheel-handler)

[![NPM](https://nodei.co/npm/react-scroll-wheel-handler.png)](https://nodei.co/npm/react-scroll-wheel-handler/)

Simple react component for handling scroll trackpad, arrow keys, swipe gestures and mouse wheel event.

# Demo

[Live Demo](https://react-scroll-wheel.herokuapp.com/)

#Update

- **2.0.0**:

add prop disableSwipe.

removed customStyle from props.

Replace CustomContainerComponent with CustomComponent. It must have ref passed as a prop. Example:

```javascript
const CustomComponent = forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} {...props} id="custom">
    {children}
  </div>
));
```

- **1.0.0**: change function to check when mouse/trackpad value increase (fix windows scroll)

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
  upHandler={(e) => console.log("scroll up")}
  downHandler={(e) => console.log("scroll down")}
>
  ...
</ReactScrollWheelHandler>
```

#Props

- **upHandler**: Function that is triggered on scroll up
- **downHandler**: Function that is triggered on scroll down
- **leftHandler**: Function that is triggered on scroll left
- **rightHandler**: Function that is triggered on scroll right
- **CustomComponent**: Component with forwardRef. It will be rendered in place of the container div.
- **pauseListeners**: Boolean. isRequired. Default: false. With this props you can block all events from be fired
- **timeout**: Integer. isRequired. Default: 600. Timeout between scroll.
- **disableKeyboard**: Boolean. Default: false.
- **disableSwipe**: Boolean. Default: false.
- **preventScroll**: Boolean. isRequired. Prevent scroll, if you want to implement your own scrolling. Default: false.
- **wheelConfig**: Array. Default: []. Set config for Lethargy lib. Example: [7, 100, 0.05]. stability, sensitivity, tolerance.

All the other props are passed to the div/component returned.

# Example

```javascript
import React, { Component } from "react";
import ReactScrollWheelHandler from " react-scroll-wheel-handler";

class App extends React.Component {
  state = {
    currentIndex: 0,
    colors: ["red", "black", "grey", "blue", "green"],
  };
  nextIndex = () => {
    const { colors, currentIndex } = this.state;
    if (currentIndex == colors.length - 1) {
      return this.setState({ currentIndex: 0 });
    }

    return this.setState({
      currentIndex: currentIndex + 1,
    });
  };

  prevIndex = () => {
    const { colors, currentIndex } = this.state;
    if (currentIndex == 0) {
      return this.setState({
        currentIndex: colors.length - 1,
      });
    }

    return this.setState({
      currentIndex: currentIndex - 1,
    });
  };

  render() {
    const { colors, currentIndex } = this.state;
    return (
      <div>
        <ReactScrollWheelHandler
          upHandler={this.prevIndex}
          downHandler={this.nextIndex}
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: colors[currentIndex],
            transition: "background-color .4s ease-out",
          }}
        >
          <h1>SCROLL FOR CHANGE BACKGROUND COLOR</h1>
        </ReactScrollWheelHandler>
      </div>
    );
  }
}
```
