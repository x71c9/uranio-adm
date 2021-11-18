<template>
	<div class="ui-sidebar-body">
		<UISideBarEntry :entry="home_entry"></UISideBarEntry>
		<div class="side-bar-group">
			<UISideBarLabel label="Atoms"></UISideBarLabel>
			<AtomNav />
		</div>
	</div>
</template>
<script lang="ts" src="./SideBarBody.ts"></script>
