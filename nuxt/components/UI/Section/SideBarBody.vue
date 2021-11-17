<template>
	<div class="flex-col">
		<UISideBarEntry :entry="home_entry"></UISideBarEntry>
		<div class="side-bar-group">
			<!-- <UISideBarLabel>Atoms</UISideBarLabel>-->
			<AtomNav />
		</div>
	</div>
</template>
<script lang="ts" src="./SideBarBody.ts"></script>
<style type="text/css">
.side-bar-group{
	margin-top: 24px;
	width: 100%;
}
.flex-col {
	display: flex;
	flex-direction: column;
}
</style>
