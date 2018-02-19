export const saveAction = noteData => ({
  type: 'SAVE',
  payload: {
    noteData,
  },
});

export const editAction = noteData => ({
  type: 'EDIT',
  payload: {
    noteData,
  },
});
