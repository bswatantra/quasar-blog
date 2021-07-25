import { axiosInstance } from "boot/axios";
import { LocalStorage } from "quasar";
const LOGIN_ROUTE = "/oauth/token";
const FETCH_USER_ROUTE = "/api/user";
let actions = {
	login ( { commit }, data ) {
		var params = {
			username: data.email,
			password: data.password,
			twofa_token: data.twofa_token
		};

		const LOGIN_CREDENTIALS = {
			grant_type: "password",
			client_id: 2,
			client_secret: 'P9l4j1MF1uw5mkIzcq2SEMCb7hkmI1H1NBS8SH5i',
			scope: "*"
		};
		Object.assign( params, LOGIN_CREDENTIALS );
		return axiosInstance.post( LOGIN_ROUTE, params )
			.then( res => {
				commit( 'SET_TOKEN', res.data );
				window.location.reload( "/" );
			} ).catch( error => {
				if ( error.response.status === 422 )
				{
					commit( 'RECORD_ERRORS', error.response.data.errors );
				}
			} );
	},

	fetch ( { commit, state } ) {
		var token = LocalStorage.getItem( "access_token" );
		if ( token )
		{
			const user = state.user;
			if ( user )
			{
				return {
					status: 200,
					data: {
						data: user
					}
				};
			}
			axiosInstance.defaults.headers.common[ "Authorization" ] = "Bearer " + token;
			const locale = LocalStorage.getItem( "locale" );
			console.log( locale );
			if ( locale == null )
			{
				LocalStorage.set( 'locale', 'en-us' );
				axiosInstance.defaults.headers.common[ "Locale" ] = 'en-us';
			} else
			{
				axiosInstance.defaults.headers.common[ "Locale" ] =
					locale;
			}
			return axiosInstance.get( FETCH_USER_ROUTE ).then( response => {
				// console.log( response.data );
				commit( "SET_USER", response.data );
				return response;
			} );
		}
	},
	logout ( { commit, state } ) {
		LocalStorage.remove( "access_token" );
		LocalStorage.remove( "refresh_token" );
		LocalStorage.remove( "locale" );
		window.location.reload( "/" );
		commit( "SET_USER", null );
	}
};

export default actions;