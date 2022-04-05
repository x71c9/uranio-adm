<template>
	<div class="main-container">
		<UISectionHeader />
		<div class="main-flex ui-main">
			<UISectionSideBar class="main-flex ui-section-sidebar"/>
			<Nuxtvclass="ui-main-nuxt" />
		</div>
		<UINotification />
	</div>
</template>
<style lang="scss" src="./urn-admin-reset.scss"></style>
<style lang="scss" src="./urn-admin-global.scss"></style>
<style lang="scss" src="./urn-admin.scss"></style>
<script lang="ts" src="./urn-admin.ts"></script>
