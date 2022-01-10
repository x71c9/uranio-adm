<template>
	<div class="main-container">
		<UISectionHeader />
		<div class="main-flex ui-main">
			<UISectionSideBar class="main-flex ui-section-sidebar"/>
			<Nuxt
				class="ui-main-nuxt"
				/>
		</div>
		<UINotification />
	</div>
</template>
<style type="text/css" src="./urn-admin-reset.css"></style>
<style type="text/css" src="./urn-admin-global.css"></style>
<style type="text/css" src="./urn-admin.css"></style>
<script lang="ts" src="./urn-admin.ts"></script>
