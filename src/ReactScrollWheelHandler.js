import React, { Component } from "react";
import PropTypes from "prop-types";
import Lethargy from "exports-loader?this.Lethargy!lethargy/lethargy";

class ReactScrollWheelHandler extends Component {
    constructor(props) {
        super(props);
        this.firedEvent = false;
        this.onTimeout = false;
        this.Lethargy = new Lethargy();
        this.containerRef = React.createRef();
    }

    componentDidMount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.addEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }

        if (this.containerRef.current) {
            this.containerRef.current.addEventListener(
                "wheel",
                this.handleWheelScroll,
                { passive: false }
            );
        }
    };

    componentWillUnmount = () => {
        const { disableKeyboard } = this.props;
        if (!disableKeyboard) {
            document.removeEventListener("keydown", this.handleKeyPress, {
                passive: true
            });
        }

        if (this.containerRef.current) {
            this.containerRef.current.removeEventListener(
                "wheel",
                this.handleWheelScroll
            );
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
        }, timeout);
    };

    handleWheelScroll = e => {
        e.stopPropagation();
        if (this.props.preventScroll) {
            e.preventDefault();
        }

        const { pauseListeners, timeout, upHandler, downHandler } = this.props;
        const scrollSign = this.Lethargy.check(e);

        if (scrollSign !== false && !this.firedEvent && !pauseListeners) {
            this.firedEvent = true;

            if (timeout) {
                this.startTimeout();
            }
            if (scrollSign > 0) {
                if (upHandler) {
                    upHandler(e);
                }
                return;
            }

            if (scrollSign < 0) {
                if (downHandler) {
                    downHandler(e);
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

    sign = number => (number ? (number < 0 ? -1 : 1) : 0);

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
            let s = this.sign(swipeX);
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
            let s = this.sign(swipeY);
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
            leftHandler,
            rightHandler,
            pauseListeners,
            disableKeyboard,
            preventScroll,
            ...otherProps
        } = this.props;

        if (typeof CustomContainerComponent === "function") {
            return (
                <CustomContainerComponent
                    onKeyPress={this.handleKeyPress}
                    style={customStyle}
                    tabIndex="0"
                    onTouchStart={this.handleSwipeStart}
                    onMouseDown={this.handleSwipeStart}
                    onMouseUp={this.handleSwipeEnd}
                    onTouchEnd={this.handleSwipeEnd}
                    ref={this.containerRef}
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
                tabIndex="0"
                ref={this.containerRef}
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
    disableKeyboard: PropTypes.bool.isRequired,
    preventScroll: PropTypes.bool.isRequired
};

ReactScrollWheelHandler.defaultProps = {
    pauseListeners: false,
    timeout: 700,
    disableKeyboard: false,
    preventScroll: false
};

export default ReactScrollWheelHandler;
