/*INJECT:DEFINE_ACTION_TYPE*/
export const HISTORY_CLEAR = "HISTORY_CLEAR";
export const HISTORY_POP = "HISTORY_POP";
export const HISTORY_PUSH = "HISTORY_PUSH";

/*INJECT:ACTION*/

/*INJECT:ACTION_REDUCER*/
export const historyClear = () => ({
	type : HISTORY_CLEAR
});

export const historyPop = () => ({
	type : HISTORY_POP
});

export const historyPush = () => ({
	type : HISTORY_PUSH
});

