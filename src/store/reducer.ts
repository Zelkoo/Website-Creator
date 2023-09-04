import {ActionTypes} from "./actions";

export interface AppState {
  elements: Array<{
    id: number,
    text: string,
    fontSize: string,
    backgroundColor: string,
    width: string,
    height: string,
    x: number,
    y: number,
    color: string,
    letterSpacing: string,
    lineHeight: string,
    alignItems: string
    borderRadius: string,
    opacity: string
  }>;
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
        fontSize: '15',
        width: '140',
        height: '100',
        letterSpacing: '0',
        backgroundColor: 'black',
        x: '500',
        y: '500',
        color: 'red',
        alignItems: 'flex-start',
        borderRadius: '0',
        opacity: '100'
      };
      return <AppState>
        {
          ...state,
          elements: [...state.elements, newElement],
        };
    case ActionTypes.SELECT_ELEMENT:
      return { ...state, selectedElementId: action.payload.id };
    case ActionTypes.UPDATE_ELEMENT_POSITION:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === action.payload.id) {
            return {...element, x: action.payload.x, y: action.payload.y}
          }
          return element
        })
      }
    case ActionTypes.UPDATE_ELEMENT_SIZE:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return {...element, width: action.payload.width, height: action.payload.height}
          }
          return element
        })
      }
    case ActionTypes.CHANGE_TEXT_CONTENT:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, text: action.payload };
          }
          return element;
        })
      }
    case ActionTypes.UPDATE_BACKGROUND_COLOR:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, backgroundColor: action.payload };
          }
          return element;
        })
      };
    case ActionTypes.UPDATE_STYLE_PROPERTY:
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id === state.selectedElementId) {
            return { ...element, [action.payload.property]: action.payload.value };
          }
          return element;
        })
      }
    default:
      return state;
  }
}
