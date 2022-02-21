<template lang="pug">
	#homepage
		h1 {{name}}
		br
		br
		NuxtLink(to='/urn-admin' class="button home_go") Go to admin
		<!-- br -->
		<!-- NuxtLink(to='/about') About -->
		<!-- br -->
		<!-- NuxtLink(to='/contact') Contact -->
</template>
<script lang="ts" src="./index.ts"></script>
