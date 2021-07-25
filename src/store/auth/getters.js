let getters = {
	user: state => {
		console.log( state );
		return state.user;
	},
	errors: state => {
		return _.flatten( Object.values( state.errors ) );
	},
};

export default getters;