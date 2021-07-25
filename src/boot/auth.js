import auth from "../store/auth";
import { axiosInstance } from "./axios";
import { jsonapiModule } from 'jsonapi-vuex';



// function isArrayOrString ( variable ) {
// 	if ( typeof variable === typeof [] || typeof variable === typeof "" )
// 	{
// 		return true;
// 	}
// 	return false;
// }

export default ( { app, router, store, Vue } ) => {

	axiosInstance.interceptors.response.use(
		response => {
			return response;
		},
	);

	/**
	 * Register i18n
	 */
	// app.i18n.mergeLocaleMessage('en-us', enUS)

	/**
	 * Register auth store
	 */
	store.registerModule( "authentication", auth );

	store.registerModule(
		"jv", jsonapiModule( axiosInstance, { preserveJson: true } )
	);

	/**
	 * Set authentication routes
	 */
	let { routes } = router.options;
	let routeData = routes.find( r => r.path === "/auth" );
	routeData.children = [
		{
			path: "/login",
			name: "login",
			component: () => import( "pages/auth/Login" )
		},
		{
			path: "/register",
			name: "login",
			component: () => import( "pages/auth/Register" )
		}
	];

	router.addRoutes( [ routeData ] );

	// store.dispatch( 'auth/fetch' ).catch( () => {
	// 	store.dispatch( 'auth/logout' );
	// } );

	var helper = {};
	helper.login = async data => {
		return store.dispatch( "auth/login", data );
	};
	helper.register = async data => {
		return store.dispatch( "auth/register", data );
	};
	helper.user = () => {
		return store.getters[ "auth/fetch" ];
	};
	helper.user = () => {
		return store.getters[ "auth/user" ];
	};
	Vue.prototype.$oauth = helper;
};