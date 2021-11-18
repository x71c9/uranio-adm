<template>
	<ul>
		<li v-for="item in items" :key="item.to">
			<UISideBarEntry :entry="item"></UISideBarEntry>
		</li>
	</ul>
</template>
<script lang="ts" src="./AtomNav.ts"></script>
