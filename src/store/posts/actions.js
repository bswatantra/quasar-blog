import { axiosInstance } from "boot/axios";
import { Loading, Notify, Dialog } from 'quasar';
let actions = {
	createPost ( { commit }, post ) {
		Loading.show( {
			message: 'Creating post...'
		} );
		axiosInstance.post( '/api/posts', post )
			.then( res => {
				commit( 'CREATE_POST', res.data );
				Loading.hide();
				Notify.create( {
					type: 'info',
					message: 'Post created.',
					position: 'bottom-right'
				} );
			} ).catch( error => {
				if ( error.response.status === 422 )
				{
					commit( 'RECORD_ERRORS', error.response.data.errors );
				}
				Loading.hide();
			} );
	},
	updatePost ( { commit }, post ) {
		Loading.show( {
			message: 'Updating post...'
		} );
		axiosInstance.put( `/api/posts/${ post.id }`, post )
			.then( res => {
				console.log( res.data );
				Loading.hide();
				Notify.create( {
					type: 'info',
					message: 'Post updated.',
					position: 'bottom-right'
				} );
			} ).catch( error => {
				console.log( error.response );
				if ( error.response.status === 422 )
				{
					commit( 'RECORD_ERRORS', error.response.data.errors );
				}
				Loading.hide();
			} );
	},
	fetchPosts ( { commit } ) {
		// commit( 'LOADING', true );
		Loading.show( {
			message: 'Fetching posts...'
		} );
		axiosInstance.get( '/api/posts' )
			.then( res => {
				commit( 'FETCH_POSTS', res.data.data );
				Loading.hide();
			} ).catch( err => {
				Loading.hide();
			} );
	},
	deletePost ( { commit }, post ) {
		console.log( Dialog.create );
		Dialog.create(
			{
				title: 'Confirm',
				message: 'Would you like to delete this post?',
				cancel: true,
				persistent: true
			} ).onOk( () => {
				Loading.show( {
					message: 'Post deleting..'
				} );
				axiosInstance.delete( `/api/posts/${ post.id }` )
					.then( res => {
						if ( res.data === 'ok' )
							commit( 'DELETE_POST', post );
						Loading.hide();
						Notify.create( {
							type: 'negative',
							message: 'Post deleted.',
							position: 'bottom-right'
						} );
					} ).catch( err => {
						console.log( err );
						Loading.hide();
					} );
			} );
	},
};

export default actions;