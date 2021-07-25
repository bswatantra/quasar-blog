import { LocalStorage } from "quasar";
import { axiosInstance } from "boot/axios";

let mutations = {
	SET_TOKEN ( state, data ) {
		axiosInstance.defaults.headers.common[ "Authorization" ] = "Bearer " + data.access_token;
		let hourInMilliseconds = 86400;
		let time = data.expires_in / hourInMilliseconds;
		LocalStorage.set( "access_token", data.access_token );
		LocalStorage.set( "refresh_token", data.refresh_token );
	},
	SET_USER ( state, data ) {
		// console.log( data );
		state.user = data;
	},
	RECORD_ERRORS ( state, errors ) {
		state.errors.length = 0;
		state.errors = errors;
	},
};
export default mutations;
