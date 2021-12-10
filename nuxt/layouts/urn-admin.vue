<template>
	<div
		class="main-container"
		>
		<UISectionSideBar class="main-flex ui-section-sidebar"/>
		<div class="main-flex ui-main">
			<UISectionHeader />
			<Nuxt
				class="ui-main-nuxt"
				/>
		</div>
			<!-- :type="notification_type" -->
			<!-- :active="notification_active" -->
			<!-- :message="notification_message" -->
			<!-- :timer="notification_timer" -->
		<UINotification
		/>
	</div>
</template>
<style type="text/css" src="./urn-admin-reset.css"></style>
<style type="text/css" src="./urn-admin-global.css"></style>
<style type="text/css" src="./urn-admin.css"></style>
<script lang="ts" src="./urn-admin.ts"></script>
