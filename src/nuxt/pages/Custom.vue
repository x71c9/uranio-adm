<template lang="pug">
	#homepage
		.wrap
			h1 Custom
			NuxtLink(to='/about' class="go") Go to about
			br
			NuxtLink(to='/' class="go") Go to home
			br
			NuxtLink(to='/urn-admin' class="go") Go to admin
</template>
<style lang="scss" src="./index.scss"></style>
