import React, { Component } from "react";
import PropTypes from "prop-types";
export default class ReactScrollWhellHandler extends Component {
    constructor(props) {
        super(props);
        this.lastScroll;
        this.nScrolling = [];
        this.firedEvent = false;
    }

    componentDidMount = () => {
        window.addEventListener("keydown", this.handleKeyPress, {
            passive: true
        });
    };

    componentWillUnmount = () => {
        window.removeEventListener("keydown", this.handleKeyPress, {
            passive: true
        });
    };

    handleWheelScroll = e => {
        const now = new Date().getTime();

        const value = -e.deltaY;
        const delta = Math.max(-1, Math.min(1, value));

        this.nScrolling.push(Math.abs(value));

        const diffTime = now - this.lastScroll;
        this.lastScroll = now;

        if (diffTime > 200) {
            this.nScrolling = [];
        }

        const medianEnd = this.getMedian(this.nScrolling, 10);
        const medianMiddle = this.getMedian(this.nScrolling, 70);
        const increase = medianEnd >= medianMiddle;

        if (increase && !this.firedEvent && !this.props.blockScrollHandler) {
            if (this.props.waitEndScroll) {
                this.firedEvent = true;
            }
            if (delta > 0) {
                this.props.upHandler();
                return;
            }

            if (delta < 0) {
                this.props.downHandler();
            }

            return;
        }

        if (increase) {
            return;
        }

        if (!this.props.waitEndScroll) {
            return;
        }
        if (this.props.blockScrollHandler) {
            return;
        }

        this.firedEvent = false;
    };

    handleKeyPress = e => {
        if (this.blockScrollHandler) {
            return;
        }

        if (e.keyCode === 38) {
            this.props.upHandler();
        } else if (e.keyCode === 40) {
            this.props.downHandler();
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

    render() {
        const { CustomContainerComponent, children, customStyle } = this.props;
        if (typeof CustomContainerComponent === "function") {
            console.log(typeof CustomContainerComponent);
            return (
                <CustomContainerComponent
                    style={customStyle}
                    onWheel={this.handleWheelScroll}
                >
                    {children}
                </CustomContainerComponent>
            );
        }
        return (
            <div style={customStyle} onWheel={this.handleWheelScroll}>
                {children}
            </div>
        );
    }
}

ReactScrollWhellHandler.propTypes = {
    upHandler: PropTypes.func,
    downHandler: PropTypes.func,
    customStyle: PropTypes.object,
    waitEndScroll: PropTypes.bool.isRequired,
    CustomContainerComponent: PropTypes.func,
    blockScrollHandler: PropTypes.bool.isRequired
};

ReactScrollWhellHandler.defaultProps = {
    waitEndScroll: true,
    blockScrollHandler: false
};
