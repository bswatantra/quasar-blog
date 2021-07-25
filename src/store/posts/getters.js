let getters = {
	posts: state => {
		return state.posts;
	},
	loading: state => {
		return state.loading;
	},
	errors: state => {
		return _.flatten( Object.values( state.errors ) );
	},
};

export default getters;