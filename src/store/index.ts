import { createStore, Store } from "vuex";

export interface IRootState {
  line: {
    displayName: string;
    pictureUrl: string;
    statusMessage: string;
    userId: string;
    token: string;
  };
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
  },
  getters: {
    getLine(state) {
      return state.line;
    },
  },
  mutations: {
    SET_LINE(state, data) {
      state.line = {
        ...state.line,
        ...data,
      };
    },
  },
  actions: {
    setLine({ commit }, data) {
      commit("SET_LINE", data);
    },
  },
  modules: {},
});

export function useStore(): Store<IRootState> {
  return store;
}
