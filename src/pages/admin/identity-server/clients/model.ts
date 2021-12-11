import { Effect, Reducer } from 'umi';
import {  ClientWithDetailsDto } from './data.d';
import { queryClients } from './service';
import { Subscription } from 'dva';

export interface IdentityClientModalState {
  clients: ClientWithDetailsDto[];
}

export interface ModelType {
  namespace: string;
  state: IdentityClientModalState;
  effects: {
    getIdentityClient: Effect;
    // getLanguages: Effect;
    // createLanguage: Effect;
    // updateLanguage: Effect;
    // deleteLanguage: Effect;
  };
  reducers: {
    saveIdentityClient:Reducer<IdentityClientModalState>;
    // saveLanguages: Reducer<ModalState>;
    // handleAddLanguages: Reducer<ModalState>;
    // handleDeleteLanguage: Reducer<ModalState>;
    // handleUpdateLanguage: Reducer<ModalState>;
  };
  subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'identityClient',
  state: {
    clients: [],
  },
  effects: {
    *getIdentityClient(_, { call, put }) {
      const response = yield call(queryClients,_.payload);
      yield put({
        type: 'saveIdentityClient',
        payload: response.items,
      });
    },
    // *getLanguages(_, { call, put }) {
    //   const response = yield call(queryLanguages);
    //   yield put({
    //     type: 'saveLanguages',
    //     payload: response.items,
    //   });
    // },
    // *createLanguage({ payload }, { call, put }) {
    //   const response = yield call(createLanguage, payload);
    //   yield put({
    //     type: 'handleAddLanguages',
    //     payload: response,
    //   });
    // },
    // *deleteLanguage({ payload }, { call, put }) {
    //   yield call(deleteLanguage, payload);
    //   yield put({
    //     type: 'handleDeleteLanguages',
    //     payload,
    //   });
    // },
    // *updateLanguage({ payload }, { call, put }) {
    //   const response = yield call(updateLanguage, payload);
    //   yield put({
    //     type: 'handleDeleteLanguages',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    saveIdentityClient(state, { payload }) {
      return {
        clients: payload,
      };
    },
    // saveLanguages(state, { payload }) {
    //   return {
    //     Languages: payload,
    //   };
    // },
    // handleAddLanguages(state, { payload }) {
    //   return {
    //     Languages: state!.Languages.concat(payload),
    //   };
    // },
    // handleDeleteLanguage(state, { payload }) {
    //   return {
    //     Languages: state!.Languages.filter((t) => t.id !== payload),
    //   };
    // },
    // handleUpdateLanguage(state, { payload }) {
    //   const oldLanguages = state!.Languages!;
    //   const newLanguages = oldLanguages.map((item) => {
    //     if (item.id === payload.id) {
    //       return payload;
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     Languages: newLanguages,
    //   };
    // },
  },
  subscriptions: {
    setup({ history }): void {
      if('/admin/text-templates'===history.location.pathname)
      {
      }
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default Model;
