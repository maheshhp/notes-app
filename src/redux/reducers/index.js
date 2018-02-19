const defaultState = {
  savedNotes: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE':
      return { ...state, savedNotes: action.payload.noteData };
    case 'EDIT':
      return state;
    default: return state;
  }
};

export default reducer;
