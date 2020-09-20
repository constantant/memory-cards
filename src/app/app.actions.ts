import { createAction, props } from '@ngrx/store';

export const loadGroups = createAction(
  `[app] Load Groups`
);

export const loadedGroups = createAction(
  `[app] Loaded Groups`,
  props<{ groups: IGroupItem[]; }>()
);
export const showCardForm = createAction(
  `[app] Show Card Form`
);
export const cancelCardForm = createAction(
  `[app] Cancel Card Form`
);
export const createCard = createAction(
  `[app] Create Card`
);
export const updateCard = createAction(
  `[app] Update Card`
);
export const deleteCard = createAction(
  `[app] Delete Card`
);
export const showGroupForm = createAction(
  `[app] Show Group Form`
);
export const cancelGroupForm = createAction(
  `[app] Cancel Group Form`
);
export const updateGroup = createAction(
  `[app] Delete Card`
);
export const deleteGroup = createAction(
  `[app] Delete Card`
);
