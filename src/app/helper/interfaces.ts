export interface Selector {
  id: number,
  isHover: boolean,
  style: StyleSelector,
  text: string
}

export interface StyleSelector {
  background: string,
  border: string,
  borderRadius: string,
  color: string,
  fontSize: string,
  height: string,
  left: string,
  letterSpacing: string,
  lineHeight: string,
  position: string,
  top: string,
  width: string
}
