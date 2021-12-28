import { createStore, Store } from "vuex";

export enum IClientOS {
  IOS = "ios",
  ANDROID = "android",
  WEB = "web",
}

export interface IRootState {
  line: {
    displayName: string;
    pictureUrl: string;
    statusMessage: string;
    userId: string;
    token: string;
  };
  OS: IClientOS | string;
}

export const store = createStore({
  state: {
    line: {
      displayName: "",
      pictureUrl: "",
      statusMessage: "",
      userId: "",
      token: "",
    },
    OS: "",
  },
  getters: {
    getLine(state) {
      return state.line;
    },
    getOS(state) {
      return state.OS;
    },
  },
  mutations: {
    SET_LINE(state, data) {
      state.line = {
        ...state.line,
        ...data,
      };
    },
    SET_OS(state, data) {
      state.OS = data;
    },
  },
  actions: {
    setLine({ commit }, data) {
      commit("SET_LINE", data);
    },
    setOS({ commit }, data) {
      commit("SET_OS", data);
    },
  },
  modules: {},
});

export function useStore(): Store<IRootState> {
  return store;
}
