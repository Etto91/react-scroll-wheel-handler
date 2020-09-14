import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactScrollWheelHandler from "../src/ReactScrollWheelHandler";
import {
  createStartTouchEventObject,
  createMoveTouchEventObject,
} from "./eventHelpers";
configure({ adapter: new Adapter() });

describe("ReactScrollWheelHandler", () => {
  test("should render the component", () => {
    const component = mount(<ReactScrollWheelHandler />);
  });
  it("should run rightHandler on right swipe", () => {
    const rightHandler = jest.fn();
    const component = mount(
      <ReactScrollWheelHandler rightHandler={rightHandler} />
    );
    component.simulate(
      "touchStart",
      createStartTouchEventObject({ x: 100, y: 0 })
    );
    component.simulate(
      "touchEnd",
      createMoveTouchEventObject({ x: 200, y: 0 })
    );

    expect(rightHandler).toHaveBeenCalled();
  });
  it("should run upHandler on up swipe", () => {
    const upHandler = jest.fn();
    const component = mount(<ReactScrollWheelHandler upHandler={upHandler} />);
    component.simulate(
      "touchStart",
      createStartTouchEventObject({ x: 0, y: 100 })
    );
    component.simulate(
      "touchEnd",
      createMoveTouchEventObject({ x: 0, y: 200 })
    );

    expect(upHandler).toHaveBeenCalled();
  });
  it("should run downHandler on down swipe", () => {
    const downHandler = jest.fn();
    const component = mount(
      <ReactScrollWheelHandler downHandler={downHandler} />
    );
    component.simulate(
      "touchStart",
      createStartTouchEventObject({ x: 0, y: 200 })
    );
    component.simulate(
      "touchEnd",
      createMoveTouchEventObject({ x: 0, y: 100 })
    );

    expect(downHandler).toHaveBeenCalled();
  });
  it("should run leftHandler on left swipe", () => {
    const leftHandler = jest.fn();
    const component = mount(
      <ReactScrollWheelHandler leftHandler={leftHandler} />
    );
    component.simulate(
      "touchStart",
      createStartTouchEventObject({ x: 200, y: 0 })
    );
    component.simulate(
      "touchEnd",
      createMoveTouchEventObject({ x: 100, y: 0 })
    );

    expect(leftHandler).toHaveBeenCalled();
  });
});
