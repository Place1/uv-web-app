export const SET_TITLE = 'SET_TITLE';

function setTitle(newTitle) {
  return {
    type: SET_TITLE,
    payload: newTitle,
  };
}

export default setTitle;
