<template>
	<q-page class="
	      bg-primary
	      window-height window-width
	      row
	      justify-center
	      items-center
	    ">
	
		<div class="column">
			<div class="row">
				<h5 class="text-h5 text-white q-my-md">Register</h5>
			</div>
	
			<div class="row">
				<q-card square bordered class="q-pa-lg shadow-1">
					<q-card-section>
						<q-form class="q-gutter-md">
							<q-input square filled clearable v-model="data.name" type="name" label="Name" />
							<q-input square filled clearable v-model="data.email" type="email" label="Email" />
	
							<q-input square filled clearable v-model="data.password" type="password" label="Password" />
	
						</q-form>
	
					</q-card-section>
	
					<q-card-actions class="q-px-md">
	
						<q-btn unelevated color="primary" size="lg" class="full-width" label="Register" @click="register(data)" />
	
					</q-card-actions>
	
					<q-card-section class="text-center q-pa-none">
	
						<p class="text-grey-6">Not reigistered? Created an Account</p>
	
					</q-card-section>
	
				</q-card>
	
			</div>
	
		</div>
	
	</q-page>
</template>

<script>
export default {
	name: "Register",
	data() {
		return {
			data: {
				email: "",
				password: "",
			},
		};
	},

	methods: {
		register(data) {
			this.$store.dispatch("auth/register", data);
		},
	},
};
</script>

<style>
.q-card {
	width: 360px;
}
</style>