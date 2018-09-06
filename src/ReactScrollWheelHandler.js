import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ReactScrollWheelHandler extends Component {
    constructor(props) {
        super(props);
        this.lastScroll;
        this.nScrolling = [];
        this.firedEvent = false;
        this.onTimeout = false;
    }

    componentDidMount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.addEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }
    };

    componentWillUnmount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.removeEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }
    };

    startTimeout = () => {
        const { timeout } = this.props;
        this.onTimeout = true;

        setTimeout(() => {
            this.onTimeout = false;
        }, timeout);
    };

    handleWheelScroll = e => {
        const { pauseListeners, timeout, upHandler, downHandler } = this.props;

        const now = new Date().getTime();

        const value = -e.deltaY;
        const signScroll = Math.max(-1, Math.min(1, value));

        this.nScrolling.push(Math.abs(value));

        const diffTime = now - this.lastScroll;
        this.lastScroll = now;

        if (diffTime > 200) {
            this.nScrolling = [];
        }

        const medianEnd = this.getMedian(this.nScrolling, 10);
        const medianMiddle = this.getMedian(this.nScrolling, 70);
        const increase = medianEnd >= medianMiddle;
        if (increase && !this.firedEvent && !pauseListeners) {
            this.firedEvent = true;

            if (timeout) {
                this.startTimeout();
            }
            if (signScroll > 0) {
                if (upHandler) {
                    upHandler();
                }
                return;
            }

            if (signScroll < 0) {
                if (downHandler) {
                    downHandler();
                }
            }

            return;
        }

        if (pauseListeners) {
            return;
        }

        if (timeout && this.onTimeout) {
            return;
        }

        this.firedEvent = false;
    };

    handleKeyPress = e => {
        const { upHandler, downHandler, timeout, pauseListeners } = this.props;
        if (pauseListeners) {
            return;
        }

        if (this.onTimeout) {
            return;
        }

        if (e.keyCode === 38) {
            if (upHandler) {
                upHandler();
            }
            if (timeout) {
                this.startTimeout();
            }
        } else if (e.keyCode === 40) {
            if (downHandler) {
                downHandler();
            }
            if (timeout) {
                this.startTimeout();
            }
        }
    };

    getMedian = (elements, number) => {
        let sum = 0;
        const lastElements = elements.slice(
            Math.max(elements.length - number, 1)
        );

        lastElements.map(element => {
            sum += element;
            return element;
        });

        return Math.ceil(sum / number);
    };

    unify = e => {
        return e.changedTouches ? e.changedTouches[0] : e;
    };

    handleSwipeStart = e => {
        this.startX = this.unify(e).clientX;
        this.startY = this.unify(e).clientY;
    };

    handleSwipeEnd = e => {
        const {
            leftHandler,
            rightHandler,
            upHandler,
            downHandler,
            timeout,
            pauseListeners
        } = this.props;
        let swipeX = 0;
        let swipeY = 0;

        if (this.onTimeout) {
            return;
        }

        if (pauseListeners) {
            return;
        }

        if (this.startX || this.startX === 0) {
            swipeX = this.unify(e).clientX - this.startX;
        }

        if (this.startY || this.startY === 0) {
            swipeY = this.unify(e).clientY - this.startY;
        }

        if (Math.abs(swipeX) > Math.abs(swipeY)) {
            let s = Math.sign(swipeX);
            if (s < 0) {
                if (leftHandler) {
                    leftHandler();
                }
            }

            if (s > 0) {
                if (rightHandler) {
                    rightHandler();
                }
            }
        } else {
            let s = Math.sign(swipeY);
            if (s < 0) {
                if (upHandler) {
                    upHandler();
                }
            }

            if (s > 0) {
                if (downHandler) {
                    downHandler();
                }
            }
        }

        if (timeout) {
            this.startTimeout();
        }

        this.startY = null;
        this.startX = null;
    };

    render() {
        const {
            CustomContainerComponent,
            children,
            customStyle,
            upHandler,
            downHandler,
            waitEndScroll,
            pauseListeners,
            ...otherProps
        } = this.props;

        if (typeof CustomContainerComponent === "function") {
            return (
                <CustomContainerComponent
                    onKeyPress={this.handleKeyPress}
                    style={customStyle}
                    onWheel={this.handleWheelScroll}
                    tabIndex="0"
                    onTouchStart={this.handleSwipeStart}
                    onMouseDown={this.handleSwipeStart}
                    onMouseUp={this.handleSwipeEnd}
                    onTouchEnd={this.handleSwipeEnd}
                    {...otherProps}
                >
                    {children}
                </CustomContainerComponent>
            );
        }
        return (
            <div
                onTouchStart={this.handleSwipeStart}
                onMouseDown={this.handleSwipeStart}
                onMouseUp={this.handleSwipeEnd}
                onTouchEnd={this.handleSwipeEnd}
                style={customStyle}
                onWheel={this.handleWheelScroll}
                tabIndex="0"
                {...otherProps}
            >
                {children}
            </div>
        );
    }
}

ReactScrollWheelHandler.propTypes = {
    upHandler: PropTypes.func,
    downHandler: PropTypes.func,
    leftHandler: PropTypes.func,
    rightHandler: PropTypes.func,
    customStyle: PropTypes.object,
    waitEndScroll: PropTypes.bool.isRequired,
    CustomContainerComponent: PropTypes.func,
    pauseListeners: PropTypes.bool.isRequired,
    timeout: PropTypes.number
};

ReactScrollWheelHandler.defaultProps = {
    waitEndScroll: true,
    pauseListeners: false,
    timeout: 600
};
