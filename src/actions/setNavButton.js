export const SET_NAV_BUTTON = 'SET_NAV_BUTTON';
export const NAV_BUTTON_LEFT = 'NAV_BUTTON_LEFT';
export const NAV_BUTTON_RIGHT = 'NAV_BUTTON_RIGHT';

function setNavButton(side, content) {
	// side should be one of NAV_BUTTON_RIGHT or NAV_BUTTON_LEFT
	return {
		type: SET_NAV_BUTTON,
		payload: { content, side }
	};
}

export default setNavButton;
