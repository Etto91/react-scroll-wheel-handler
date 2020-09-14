import React, { forwardRef } from "react";
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
  it("should not run leftHandler on left swipe if swipe is disabled", () => {
    const leftHandler = jest.fn();
    const component = mount(
      <ReactScrollWheelHandler leftHandler={leftHandler} disableSwipe />
    );
    component.simulate(
      "touchStart",
      createStartTouchEventObject({ x: 200, y: 0 })
    );
    component.simulate(
      "touchEnd",
      createMoveTouchEventObject({ x: 100, y: 0 })
    );

    expect(leftHandler).not.toHaveBeenCalled();
  });
  it("should run upHandler on up scroll", () => {
    const map = {};

    const upHandler = jest.fn();
    const stopPropagation = jest.fn();

    const component = mount(<ReactScrollWheelHandler upHandler={upHandler} />);

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: -50, stopPropagation });

    expect(upHandler).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should run downHandler on down scroll", () => {
    const map = {};

    const downHandler = jest.fn();
    const stopPropagation = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler downHandler={downHandler} />
    );

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: 50, stopPropagation });

    expect(downHandler).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should run downHandler on arrow down keypress", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const downHandler = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler downHandler={downHandler} />
    );
    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 40 });

    expect(downHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run leftHandler on arrow left keypress", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const leftHandler = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler leftHandler={leftHandler} />
    );

    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 39 });

    expect(leftHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run rightHandler on arrow right keypress", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const rightHandler = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler rightHandler={rightHandler} />
    );
    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 37 });

    expect(rightHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run upHandler on arrow up keypress", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const upHandler = jest.fn();

    const component = mount(<ReactScrollWheelHandler upHandler={upHandler} />);
    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 38 });

    expect(upHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should not run downHandler on down scroll if pauseListeners is set to true", () => {
    const map = {};

    const downHandler = jest.fn();
    const stopPropagation = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler downHandler={downHandler} pauseListeners />
    );

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: 50, stopPropagation });

    expect(downHandler).not.toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should call preventDefault if preventScroll is true", () => {
    const map = {};

    const downHandler = jest.fn();
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();

    const component = mount(
      <ReactScrollWheelHandler downHandler={downHandler} preventScroll />
    );

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: 50, stopPropagation, preventDefault });

    expect(downHandler).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should set Lethargy options if are passed as a prop", () => {
    const component = mount(
      <ReactScrollWheelHandler preventScroll wheelConfig={[0.2, 0.1, 300]} />
    );

    const lethargy = component.instance().Lethargy;

    expect(lethargy.stability).toBe(0.2);
    expect(lethargy.sensitivity).toBe(1.1);
    expect(lethargy.tolerance).toBe(301);
  });
  it("should render CustomComponent", () => {
    const A = forwardRef(({ children }, ref) => (
      <div ref={ref} id="custom">
        {children}
      </div>
    ));
    const component = mount(<ReactScrollWheelHandler CustomComponent={A} />);

    const div = component.find("div").last().getElement();
    expect(div.props.id).toBe("custom");
  });

  it("should run rightHandler on right swipe - custom component", () => {
    const rightHandler = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler
        CustomComponent={A}
        rightHandler={rightHandler}
      />
    );

    component
      .children()
      .children()
      .first()
      .simulate("touchStart", createStartTouchEventObject({ x: 100, y: 0 }));
    component
      .children()
      .children()
      .first()
      .simulate("touchEnd", createMoveTouchEventObject({ x: 200, y: 0 }));

    expect(rightHandler).toHaveBeenCalled();
  });
  it("should not run rightHandler on right swipe if swipe is disabled - custom component", () => {
    const rightHandler = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler
        CustomComponent={A}
        rightHandler={rightHandler}
        disableSwipe
      />
    );

    component
      .children()
      .children()
      .first()
      .simulate("touchStart", createStartTouchEventObject({ x: 100, y: 0 }));
    component
      .children()
      .children()
      .first()
      .simulate("touchEnd", createMoveTouchEventObject({ x: 200, y: 0 }));

    expect(rightHandler).not.toHaveBeenCalled();
  });
  it("should run leftHandler on left swipe - custom component", () => {
    const leftHandler = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} leftHandler={leftHandler} />
    );

    component
      .children()
      .children()
      .first()
      .simulate("touchStart", createStartTouchEventObject({ x: 200, y: 0 }));
    component
      .children()
      .children()
      .first()
      .simulate("touchEnd", createMoveTouchEventObject({ x: 100, y: 0 }));

    expect(leftHandler).toHaveBeenCalled();
  });
  it("should run upHandler on up swipe - custom component", () => {
    const upHandler = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} upHandler={upHandler} />
    );

    component
      .children()
      .children()
      .first()
      .simulate("touchStart", createStartTouchEventObject({ x: 0, y: 100 }));
    component
      .children()
      .children()
      .first()
      .simulate("touchEnd", createMoveTouchEventObject({ x: 0, y: 200 }));

    expect(upHandler).toHaveBeenCalled();
  });
  it("should run downHandler on down swipe - custom component", () => {
    const downHandler = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} downHandler={downHandler} />
    );

    component
      .children()
      .children()
      .first()
      .simulate("touchStart", createStartTouchEventObject({ x: 0, y: 200 }));
    component
      .children()
      .children()
      .first()
      .simulate("touchEnd", createMoveTouchEventObject({ x: 0, y: 100 }));

    expect(downHandler).toHaveBeenCalled();
  });
  it("should run downHandler on down scroll - custom component", () => {
    const map = {};

    const downHandler = jest.fn();
    const stopPropagation = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} downHandler={downHandler} />
    );

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: 50, stopPropagation });

    expect(downHandler).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should run downHandler on up scroll - custom component", () => {
    const map = {};

    const upHandler = jest.fn();
    const stopPropagation = jest.fn();
    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} upHandler={upHandler} />
    );

    const box = component.find("div").last();
    box.instance().addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    component.instance().componentDidMount();

    map.wheel({ deltaY: -50, stopPropagation });

    expect(upHandler).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });
  it("should run rightHandler on arrow right keypress - custom component", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const rightHandler = jest.fn();

    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler
        CustomComponent={A}
        rightHandler={rightHandler}
      />
    );

    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 37 });

    expect(rightHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run leftHandler on arrow left keypress - custom component", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const leftHandler = jest.fn();

    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} leftHandler={leftHandler} />
    );

    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 39 });

    expect(leftHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run downHandler on arrow down keypress - custom component", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const downHandler = jest.fn();

    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} downHandler={downHandler} />
    );

    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 40 });

    expect(downHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
  it("should run upHandler on arrow up keypress - custom component", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const upHandler = jest.fn();

    const A = forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props} id="custom">
        {children}
      </div>
    ));
    const component = mount(
      <ReactScrollWheelHandler CustomComponent={A} upHandler={upHandler} />
    );

    component.instance().startTimeout = jest.fn();

    map.keydown({ keyCode: 38 });

    expect(upHandler).toHaveBeenCalled();
    expect(component.instance().startTimeout).toHaveBeenCalled();
  });
});
