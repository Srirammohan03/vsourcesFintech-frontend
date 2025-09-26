export {};

declare global {
  interface Window {
    Chatty?: any;
    gbWidgetOnClose?: () => void;
  }
}
