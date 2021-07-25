let mutations = {
	CREATE_POST ( state, post ) {
		state.posts.unshift( post );
	},
	UPDATE_POST ( state, post ) {
		return state.posts = posts;
	},
	FETCH_POSTS ( state, posts ) {
		return state.posts = posts;
	},
	DELETE_POST ( state, post ) {
		let index = state.posts.findIndex( item => item.id === post.id );
		state.posts.splice( index, 1 );
	},
	LOADING ( state, loading ) {
		state.loading = loading;
	},
	RECORD_ERRORS ( state, errors ) {
		state.errors.length = 0;
		state.errors = errors;
	},
};
export default mutations;
