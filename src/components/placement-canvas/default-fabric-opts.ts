export const defaultCanvasOpts: fabric.ICanvasOptions = {
  backgroundColor: "rgb(245,245,245)",
  selection: false,
};
export const defaultRectOpts: fabric.IRectOptions = {
  evented: false,
  originX: "center",
  originY: "center",
};
export const defaultPlacementRectOpts: fabric.IRectOptions = {
  ...defaultRectOpts,
  absolutePositioned: true,
  objectCaching: false,
  fill: "transparent",
  stroke: "gray",
};
export const defaultLayerRectOpts: fabric.IRectOptions = {
  fill: "red",
  ...defaultRectOpts,
};
