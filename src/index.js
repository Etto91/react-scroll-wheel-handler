import React from "react";
import ReactDOM from "react-dom";
import ReactScroll from "./ReactScrollWheelHandler";

class App extends React.Component {
    render() {
        return (
            <div>
                <ReactScroll
                    CustomContainerComponent={Test}
                    upHandler={() => console.log("dio porco")}
                    downHandler={() => console.log("dio maiale")}
                    customStyle={{
                        width: "100%",
                        height: "100vh",
                        backgroundColor: "blue"
                    }}
                />
            </div>
        );
    }
}

const Test = props => <div {...props} />;

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render();
