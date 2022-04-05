<template lang="pug">
	#homepage
		h1 {{name}}
		br
		br
		NuxtLink(to='/urn-admin' class="home_go") Go to admin
</template>
<script lang="ts" src="./index.ts"></script>
