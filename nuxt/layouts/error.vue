<template>
	<div
		class="main-container"
		>
		<UISectionSideBar class="main-flex ui-section-sidebar"/>
		<div class="main-flex ui-main">
			<UISectionHeader />
		</div>
		<div class="ui-main-nuxt error">
			<Error
				:message="message"
				:error="error"
				/>
		</div>
		<UINotification/>
	</div>
</template>
<style type="text/css" src="./urn-admin-reset.css"></style>
<style type="text/css" src="./urn-admin-global.css"></style>
<style type="text/css" src="./urn-admin.css"></style>
<!-- <script lang="ts" src="./error.ts"></script> -->
<script lang="ts">
  export default {
		data(){
			return{
				message: 'An error occured.'
			}
		},
		props: ['error'],
		layout: 'error' // you can set a custom layout for the error page
	}
</script>
