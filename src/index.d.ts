declare module 'react-scroll-wheel-handler' {
  import { Component, DetailedHTMLProps, HTMLAttributes } from 'react';

  export type ReactScrollWheelHandlerWheelConfig = [stability: number, sensitivity: number, tolerance: number, delay: number];

  export interface ReactScrollWheelHandlerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    upHandler?: (event: WheelEvent) => void,
    downHandler?: (event: WheelEvent) => void,
    leftHandler?: (event: WheelEvent) => void,
    rightHandler?: (event: WheelEvent) => void,
    CustomComponent?: JSX.Element,
    timeout?: number,
    wheelConfig?: ReactScrollWheelHandlerWheelConfig,
    pauseListeners?: boolean,
    disableKeyboard?: boolean,
    disableSwipe?: boolean,
    preventScroll?: boolean,
  }

  // eslint-disable-next-line react/prefer-stateless-function
  class ReactScrollWheelHandler extends Component<ReactScrollWheelHandlerProps> {}
  export default ReactScrollWheelHandler;
}
