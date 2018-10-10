import React, { Component } from "react";
import PropTypes from "prop-types";
import IncreaseModel from "./IncreaseOrDecreaseModel";

class ReactScrollWheelHandler extends Component {
    constructor(props) {
        super(props);
        this.lastScroll;
        this.nScrolling = [];
        this.firedEvent = false;
        this.onTimeout = false;
        this.scrollTime = 0;
        this.trainData = [];
        this.dataString = "";
        this.isSafari = false;
    }

    componentDidMount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.addEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }
        this.isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
    };

    componentWillUnmount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.removeEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }

        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    startTimeout = () => {
        const { timeout } = this.props;
        this.onTimeout = true;

        this.timer = setTimeout(() => {
            this.onTimeout = false;
            this.firedEvent = false;
            console.log("clearTimeout");
        }, timeout);
    };

    setTrainData = value => {
        if (this.trainData.length + 1 < 4) {
            this.trainData.push(value);

            while (this.trainData.length < 4) {
                this.trainData.unshift(0);
            }

            return;
        }

        this.trainData.push(value);

        this.trainData.shift();

        return;
    };

    handleWheelScroll = e => {
        const { pauseListeners, timeout, upHandler, downHandler } = this.props;
        const now = new Date().getTime();
        const diffTime = now - this.lastScroll;

        if (!isNaN(this.lastScroll)) {
            this.scrollTime += diffTime;
        }

        this.lastScroll = now;

        const value = e.wheelDelta || -e.deltaY || -e.detail;
        const signScroll = Math.max(-1, Math.min(1, value));

        this.setTrainData(Math.abs(value));
        const { increase, mac, trackpad } = IncreaseModel(this.trainData);
        if (!this.firedEvent && !pauseListeners && diffTime > 200) {
            console.log("new scroll");
            this.trainData = [];
            this.scrollTime = 0;
        }

        // const data = {
        //     input: this.trainData,
        //     output: { increase: 0, mac: 0, trackpad: 0 }
        // };
        // this.dataString += JSON.stringify(data) + ",";
        // localStorage.dataString = this.dataString;
        // console.log(this.trainData);

        // if (diffTime !== now) {
        //     this.scrollTime += diffTime;
        // }

        const increasePercent = (increase * 100).toFixed(2);
        console.log(increasePercent > 46 || this.isSafari, this.firedEvent);
        if (
            (increasePercent > 46 || this.isSafari) &&
            !this.firedEvent &&
            !pauseListeners
        ) {
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
        const {
            upHandler,
            downHandler,
            leftHandler,
            rightHandler,
            timeout,
            pauseListeners
        } = this.props;
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
        }

        if (e.keyCode === 37) {
            if (rightHandler) {
                rightHandler();
            }
            if (timeout) {
                this.startTimeout();
            }
        }

        if (e.keyCode === 39) {
            if (leftHandler) {
                leftHandler();
            }
            if (timeout) {
                this.startTimeout();
            }
        }

        if (e.keyCode === 40) {
            if (downHandler) {
                downHandler();
            }
            if (timeout) {
                this.startTimeout();
            }
        }
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
                if (downHandler) {
                    downHandler();
                }
            }

            if (s > 0) {
                
                if (upHandler) {
                    upHandler();
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
            disableKeyboard,
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
    CustomContainerComponent: PropTypes.func,
    pauseListeners: PropTypes.bool.isRequired,
    timeout: PropTypes.number,
    disableKeyboard: PropTypes.bool.isRequired
};

ReactScrollWheelHandler.defaultProps = {
    pauseListeners: false,
    timeout: 600,
    disableKeyboard: false
};

export default ReactScrollWheelHandler;
