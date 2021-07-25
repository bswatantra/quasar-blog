
import { auth, guest } from "../router/middleware/index";
import Route from "vue-routisan";

Route.setViewResolver( ( component ) => {
	return require( 'src/pages/' + component ).default;
} );

Route.view( "/auth", 'layouts/Auth' ).guard( guest ).children( () => {} );

Route.view( '/', 'layouts/Main' ).guard( auth ).children( () => {
	Route.view( '', 'Index' );
} );
export default Route.all();




// const routes = [
// 	{
// 		path: '/',
// 		component: () => import( 'pages/layouts/Main' ),
// 		children: [
// 			{ path: '', component: () => import( 'pages/Index' ) }
// 		]
// 	},


// 	// Always leave this as last one,
// 	// but you can also remove it
// 	{
// 		path: '/:catchAll(.*)*',
// 		component: () => import( 'pages/Error404' )
// 	}
// ];

// export default routes;