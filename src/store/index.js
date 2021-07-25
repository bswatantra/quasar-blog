import Vue from "vue";
import Vuex from "vuex";
import posts from './posts';
import auth from './auth';

Vue.use( Vuex );

const store = new Vuex.Store( {
	modules: {
		posts,
		auth,
	},

	// enable strict mode (adds overhead!)
	// for dev mode only
	strict: false
} );

export default store;

