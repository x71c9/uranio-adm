<template>
	<div>
		<div
			v-if="items_atom.length > 0"
			class="side-bar-group"
			>
			<UISideBarLabel label="Atoms"></UISideBarLabel>
			<ul>
				<li v-for="item in items_atom" :key="item.to">
					<UISideBarEntry :entry="item"></UISideBarEntry>
				</li>
			</ul>
		</div>
		<div
			v-if="items_log.length > 0"
			class="side-bar-group"
			>
			<UISideBarLabel label="Logs"></UISideBarLabel>
			<ul>
				<li v-for="item in items_log" :key="item.to">
					<UISideBarEntry :entry="item"></UISideBarEntry>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts" src="./AtomNav.ts"></script>
