<template lang="pug">
	#homepage
		.wrap
			h1 About
			NuxtLink(to='/custom' class="go") Go to custom
			br
			NuxtLink(to='/' class="go") Go to home
			br
			NuxtLink(to='/urn-admin' class="go") Go to admin
</template>
<style lang="scss" src="./index.scss"></style>
