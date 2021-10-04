<template>
	<div>
		<h2>Admin nav</h2>
		<ul>
			<li v-for="item in items" :key="item.id">
				<NuxtLink :to="`/urn-admin/${item.name}`">{{ item.name }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>
<script lang="ts" src="./Navigation.ts"></script>
