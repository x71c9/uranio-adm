<template>
	<div class="main-container">
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
<script lang="ts">
  export default {
		data(){
			return{
				message: 'An error occured.'
			}
		},
		middleware: 'auth',
		props: ['error'],
	}
</script>
