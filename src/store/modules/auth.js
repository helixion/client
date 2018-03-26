
'use strict';

import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bis_access_token');

export const state = {
    isAuthenticated: null,
    currentUser: null
}

export const getters = {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.currentUser
}

export const mutations = {
    SET_AUTHENTICATION(state, bool) {
        state.isAuthenticated = bool;
    },

    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}

export const actions = {
   async authenticate({ dispatch, commit }, { email, password }) {
        try {
            const response = await axios.post('/users/login', {
              email,
              password
            });

            if (response.status >= 200 && response.status < 400) {
              const token = response.data['access_token'];
              localStorage.setItem('bis_access_token', token);
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              dispatch('setAuthentication', true);
              dispatch('setCurrentUser');
            }

        } catch (e) {
            if (e.response) {
                Object.keyts(e.response)
                    .forEach(err => console.log(e.response[err]));
            }
        }
        
    },

    async invalidate({ dispatch, commit }) {
        localStorage.removeItem('bis_access_token');
        dispatch('setAuthentication', false);

        await axios.post('/users/logout').catch();
        axios.defaults.headers.common['Authorization'] = '';

        if (state.currentUser) {
          commit('SET_CURRENT_USER', null);
        }

       
    },

    setAuthentication({ commit }, bool) {
        commit('SET_AUTHENTICATION', bool)
    },

    async setCurrentUser({ state, commit, dispatch }) {
            try {
                const response = await axios.get('/users');
                if (response.status >= 200 && response.status < 400) {
                    commit('SET_CURRENT_USER', response.data.user);
                }
            }
            catch (e) {
                if (e.response) {
                    const status = e.response.status === 401;
                    const expired = e.response.data.token_expired;
                    if (status && expired) {
                      if (state.isAuthenticated) {
                        dispatch('invalidate');
                      }
                    } else {
                      console.log(e.response);
                    }

                }
                console.log(e.config);
            }

    }
}
