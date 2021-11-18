<template>
	<div class="flex-col">
		<UISideBarEntry :entry="home_entry"></UISideBarEntry>
		<div class="side-bar-group">
			<UISideBarLabel label="Atoms"></UISideBarLabel>
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
.side-bar-group ul{
	margin-top: 8px;
}
.flex-col {
	display: flex;
	flex-direction: column;
	padding-top: 34px;
}
</style>
