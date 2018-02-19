export const saveAction = noteData => ({
  type: 'SAVE',
  payload: {
    noteData,
  },
});

export const editAction = () => ({
  type: 'SYNC',
});
