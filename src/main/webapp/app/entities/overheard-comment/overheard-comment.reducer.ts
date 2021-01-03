import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOverheardComment, defaultValue } from 'app/shared/model/overheard-comment.model';

export const ACTION_TYPES = {
  FETCH_OVERHEARDCOMMENT_LIST: 'overheardComment/FETCH_OVERHEARDCOMMENT_LIST',
  FETCH_OVERHEARDCOMMENT: 'overheardComment/FETCH_OVERHEARDCOMMENT',
  CREATE_OVERHEARDCOMMENT: 'overheardComment/CREATE_OVERHEARDCOMMENT',
  UPDATE_OVERHEARDCOMMENT: 'overheardComment/UPDATE_OVERHEARDCOMMENT',
  DELETE_OVERHEARDCOMMENT: 'overheardComment/DELETE_OVERHEARDCOMMENT',
  RESET: 'overheardComment/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOverheardComment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OverheardCommentState = Readonly<typeof initialState>;

// Reducer

export default (state: OverheardCommentState = initialState, action): OverheardCommentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OVERHEARDCOMMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OVERHEARDCOMMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OVERHEARDCOMMENT):
    case REQUEST(ACTION_TYPES.UPDATE_OVERHEARDCOMMENT):
    case REQUEST(ACTION_TYPES.DELETE_OVERHEARDCOMMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_OVERHEARDCOMMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OVERHEARDCOMMENT):
    case FAILURE(ACTION_TYPES.CREATE_OVERHEARDCOMMENT):
    case FAILURE(ACTION_TYPES.UPDATE_OVERHEARDCOMMENT):
    case FAILURE(ACTION_TYPES.DELETE_OVERHEARDCOMMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OVERHEARDCOMMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OVERHEARDCOMMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OVERHEARDCOMMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_OVERHEARDCOMMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OVERHEARDCOMMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/overheard-comments';

// Actions

export const getEntities: ICrudGetAllAction<IOverheardComment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OVERHEARDCOMMENT_LIST,
  payload: axios.get<IOverheardComment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOverheardComment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OVERHEARDCOMMENT,
    payload: axios.get<IOverheardComment>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOverheardComment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OVERHEARDCOMMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOverheardComment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OVERHEARDCOMMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOverheardComment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OVERHEARDCOMMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
