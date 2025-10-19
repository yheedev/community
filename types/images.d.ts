declare module "*.png" {
  const value: any;
  export = value;
}
declare module "*.jpg" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}
declare module "*.jpeg" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}
