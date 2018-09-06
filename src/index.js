import React from "react";
import ReactDOM from "react-dom";
import ReactScrollWheelHandler from "../index";

import styled from "styled-components";

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
                <ReactScrollWheelHandler
                    upHandler={this.prevIndex}
                    downHandler={this.nextIndex}
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
