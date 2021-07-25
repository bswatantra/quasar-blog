<template>
	<q-page padding>
		<form>
			<q-input class="q-mr-xl q-mb-xl" v-model="post.title" label="Title" />
			<q-input class="q-mr-xl q-mb-xl" v-model="post.content" label="description" />
			<q-btn color="primary" type="submit" label="Submit" v-if="isValid" @click.prevent="submitFrom(post)" />
			<p class="q-mt-sm text-negative" v-for="error in errors" :key="error">
				<span v-if="isValidError">
											{{ error }}
										</span>
			</p>
		</form>
	
		<h5>Blogs</h5>
	
		<div class="row" v-for="post in posts" :key="post.id">
			<div class="col-10">
				<div class="row">
					<span class="text-weight-bold col-9">{{ post.title }}</span>
					<span class="q-ml-xl col-2">Posted By : kkk</span>
				</div>
				<p>{{ post.content }}</p>
	
			</div>
			<div class="col-2">
				<q-btn class="q-mr-sm q-mb-sm" color="primary" label="Edit" @click="editPost(post)" />
				<q-btn class="q-mr-sm q-mb-sm" color="red" label="Delete" @click="deletePost(post)" />
				<q-btn class="q-mb-sm" color="secondary" label="Show" />
			</div>
		</div>
	</q-page>
</template>


<script>
import { mapGetters } from "vuex";

export default {
	name: "Posts",
	data() {
		return {
			post: {
				id: "",
				title: "",
				content: "",
			},
		};
	},

	computed: {
		...mapGetters("posts", {
			posts: "posts",
		}),
		...mapGetters("posts", {
			errors: "errors",
		}),
		isValid() {
			return this.post.title !== "" && this.post.content !== "";
		},
		isValidError() {
			return this.post.title.length !== 10;
		},
	},
	mounted() {
		this.$store.dispatch("posts/fetchPosts");
	},
	methods: {
		submitFrom(post) {
			if (!post.id) {
				this.createPost(post);
			} else {
				this.updatePost(post);
			}
		},
		createPost(post) {
			this.$store.dispatch("posts/createPost", post);
		},
		editPost(post) {
			this.post.id = post.id,
				this.post.title = post.title,
				this.post.content = post.content
		},
		updatePost(post) {
			this.$store.dispatch("posts/updatePost", post);
			this.$store.dispatch("posts/fetchPosts");
		},
		deletePost(post) {
			this.$store.dispatch("posts/deletePost", post);
		},
	},
};
</script>
