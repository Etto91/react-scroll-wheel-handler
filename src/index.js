import React from "react";
import ReactDOM from "react-dom";
import ReactScroll from "./ReactScrollWheelHandler";
import styled from "styled-components";

class App extends React.Component {
    state = {
        currentIndex: 0,
        colors: ["red", "black", "grey", "blue", "green"],
        blockScroll: false
    };
    nextIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == colors.length - 1) {
            this.clearTimeOut();
            return this.setState({ currentIndex: 0, blockScroll: true });
        }

        this.clearTimeOut();

        return this.setState({
            currentIndex: currentIndex + 1,
            blockScroll: true
        });
    };

    prevIndex = () => {
        const { colors, currentIndex } = this.state;
        if (currentIndex == 0) {
            this.clearTimeOut();
            return this.setState({
                currentIndex: colors.length - 1,
                blockScroll: true
            });
        }
        this.clearTimeOut();

        return this.setState({
            currentIndex: currentIndex - 1,
            blockScroll: true
        });
    };

    clearTimeOut = () => {
        setTimeout(() => {
            this.setState({
                blockScroll: false
            });
        }, 2000);
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

const Test = styled.div`
    width: "100%";
    height: "100vh";
    background-color: "blue";
`;

ReactDOM.render(<App />, document.getElementById("app"));
