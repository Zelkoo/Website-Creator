import {ActionTypes} from "./actions";

export interface AppState {
  elements: Array<{ id: number, text: string, fontSize: string, width: string, height: string, x: any, y: any, color: string, letterSpacing: string, lineHeight: string }>;
  selectedElementId: number | null;
}

export const initialState: AppState = {
  elements: [],
  selectedElementId: null
};

export function appReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case ActionTypes.CREATE_ELEMENT:
      const newElement = {
        id: state.elements.length + 1,
        text: 'Element Content',
        fontSize: '15px',
        width: '140',
        height: '200',
        letterSpacing: '0px',
        color: 'red',
        x: '500',
        y: '500'
      };
      return <AppState>{ ...state, elements: [...state.elements, newElement] };
    case ActionTypes.SELECT_ELEMENT:
      return { ...state, selectedElementId: action.payload.id };
    case ActionTypes.UPDATE_ELEMENT_POSITION:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return {...element, x: action.payload.x, y: action.payload.y}
          }
          return element
        })
      }
    case ActionTypes.CHANGE_TEXT_CONTENT:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            console.log(state)
            return { ...element, text: action.payload };
          }
          return element;
        })
      }
    case ActionTypes.UPDATE_FONT_SIZE:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, fontSize: action.payload };
          }
          return element;
        })
      }
    case ActionTypes.UPDATE_LINE_HEIGHT:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, lineHeight: action.payload };
          }
          return element;
        })
      }
    case ActionTypes.UPDATE_LETTER_SPACING:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, letterSpacing: action.payload };
          }
          return element;
        })
      }
    case ActionTypes.UPDATE_FONT_COLOR:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, color: action.payload };
          }
          return element;
        })
      };
    default:
      return state;
  }
}
