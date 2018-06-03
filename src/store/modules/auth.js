"use strict";

import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("bis_access_token");

export const state = {
  isAuthenticated: null,
  currentUser: null
};

export const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.currentUser
};

export const mutations = {
  SET_AUTHENTICATION(state, bool) {
    state.isAuthenticated = bool;
  },

  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },

  SET_AVATAR(state, avatarUrl) {
    state.currentUser.avatar = avatarUrl;
  }
};

export const actions = {
  async authenticate({ dispatch, commit }, { email, password }) {
    const response = await axios.post("/users/login", {
      email,
      password
    });

    if (response.status >= 200 && response.status < 400) {
      const token = response.data["access_token"];
      localStorage.setItem("bis_access_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch("setModal", false);
      dispatch("setCurrentUser");
      dispatch("setAuthentication", true);
    }
    console.log(response);
  },

  async invalidate({ dispatch, commit }) {
    try {
      await axios.post("/users/logout");
    } catch (e) {
      console.log(e);
    }
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("bis_access_token");
    commit("SET_AUTHENTICATION", false);
    commit("SET_CURRENT_USER", null);
  },

  setAuthentication({ commit, dispatch }, bool) {
    dispatch("setCurrentUser");
    commit("SET_AUTHENTICATION", bool);
  },

  setAvatar({ commit }, payload) {
    commit("SET_AVATAR", payload);
  },

  async setCurrentUser({ state, commit, dispatch }) {
    try {
      const response = await axios.get("/users");
      if (response.status >= 200 && response.status < 400) {
        commit("SET_CURRENT_USER", response.data.user);
      }
    } catch (e) {
      if (e.response) {
        const status = e.response.status === 401;
        const expired = e.response.data.token_expired;
        if (status && expired) {
          if (state.isAuthenticated) {
            dispatch("invalidate");
          }
        } else {
          console.log(e.response);
        }
      }
      console.log(e.config);
    }
  }
};
