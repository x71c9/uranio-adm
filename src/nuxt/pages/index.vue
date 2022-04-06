<template lang="pug">
	#homepage
		.wrap
			h1 {{name}}
			NuxtLink(to='/urn-admin' class="go") Go to admin
</template>
<style lang="scss" src="../layouts/urn-admin-reset.scss"></style>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss"></style>
