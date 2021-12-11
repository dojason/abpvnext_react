import { Effect, Reducer } from 'umi';
import {  TemplateDefinitionDto } from './data.d';
import { queryTemplatesDefinitions } from './service';
import { Subscription } from 'dva';

export interface TextTemplateModalState {
  TemplateDefinitions: TemplateDefinitionDto[];
}

export interface ModelType {
  namespace: string;
  state: TextTemplateModalState;
  effects: {
    getTextTemplatesDefinitions: Effect;
    // getLanguages: Effect;
    // createLanguage: Effect;
    // updateLanguage: Effect;
    // deleteLanguage: Effect;
  };
  reducers: {
    saveTextTemplatesDefinitions:Reducer<TextTemplateModalState>;
    // saveLanguages: Reducer<ModalState>;
    // handleAddLanguages: Reducer<ModalState>;
    // handleDeleteLanguage: Reducer<ModalState>;
    // handleUpdateLanguage: Reducer<ModalState>;
  };
  // subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'textTemplate',
  state: {
    TemplateDefinitions: [],
  },
  effects: {
    *getTextTemplatesDefinitions(_, { call, put }) {
      const response = yield call(queryTemplatesDefinitions);
      yield put({
        type: 'saveTextTemplatesDefinitions',
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
    saveTextTemplatesDefinitions(state, { payload }) {
      return {
        TemplateDefinitions: payload,
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
  // subscriptions: {
  //   setup({ history }): void {
  //     console.log(history.location.pathname);
  //     if('/admin/text-templates'===history.location.pathname)
  //     {
  //         console.log('文本');
  //     }
  //     history.listen(({ pathname, search }): void => {
  //       if (typeof window.ga !== 'undefined') {
  //         console.log('send', 'pageview', pathname + search);
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
};
export default Model;
