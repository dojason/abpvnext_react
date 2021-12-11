import { Effect, Reducer } from 'umi';
import { ApiResourceWithDetailsDto} from './data.d';
import { queryApiResource } from './service';
import { Subscription } from 'dva';

export interface ApiResourceModalState {
  apiResources: ApiResourceWithDetailsDto[];
}

export interface ModelType {
  namespace: string;
  state: ApiResourceModalState;
  effects: {
    getApiResource: Effect;
    // getLanguages: Effect;
    // createLanguage: Effect;
    // updateLanguage: Effect;
    // deleteLanguage: Effect;
  };
  reducers: {
    saveApiResource:Reducer<ApiResourceModalState>;
    // saveLanguages: Reducer<ModalState>;
    // handleAddLanguages: Reducer<ModalState>;
    // handleDeleteLanguage: Reducer<ModalState>;
    // handleUpdateLanguage: Reducer<ModalState>;
  };
  subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'apiResource',
  state: {
    apiResources: [],
  },
  effects: {
    *getApiResource(_, { call, put }) {
      const response = yield call(queryApiResource);
      console.log(response.items);
      yield put({
        type: 'saveApiResource',
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
    saveApiResource(state, { payload }) {
      return {
        apiResources: payload,
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
      console.log(history.location.pathname);
      if('/admin/text-templates'===history.location.pathname)
      {
        console.log('文本');
      }
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          console.log('send', 'pageview', pathname + search);
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default Model;
