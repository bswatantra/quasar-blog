<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" />
				<q-toolbar-title> Quasar App </q-toolbar-title>
				<div>
					<q-item clickable @click="logout">
						<span class="q-mt-sm">logout</span>
					</q-item>
				</div>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: "App",
	methods: {
		logout() {
			this.$store.dispatch("auth/logout");
		}
	},
};
</script>
