export interface Button {
  id: number;
  style: ButtonStyle;
  text: string;
}
export interface ButtonStyle {
  position: string;
  left: string;
  top: string;
  width: string;
  height: string;
  fontSize: string;
  background: string;
  color: string;
}
export interface ButtonEditorState {
  buttons: Button[];
}

export const initialButtonEditorState: ButtonEditorState = {
  buttons: [],
};
