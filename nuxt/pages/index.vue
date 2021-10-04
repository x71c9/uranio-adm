<template lang="pug">
	#homepage
		h1 {{name}}
		NuxtLink(to='/urn-admin') Admin
		br
		NuxtLink(to='/about') About
		br
		NuxtLink(to='/contact') Contact
</template>
<script lang="ts" src="./index.ts"></script>
