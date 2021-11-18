<template>
	<NuxtLink class="ui-sidebar-entry" :to="entry.to">
		<div class="x1-one-line">
			<div class="x-base1-one-lin-left-label-icon">
				<img v-if="entry.icon" class="icon" :src="entry.icon">
				<div
					class="label-3 inter-normal-white-16px"
					:class="{'label-with-margin': entry.icon}"
					>
					<span class="inter-normal-white-16px">{{ entry.label }}</span>
				</div>
			</div>
			<!-- <div class="counter">-->
			<!--   <div class="x0 inter-normal-white-10px">-->
			<!--     <span class="inter-normal-white-10px">453</span>-->
			<!--   </div>-->
			<!-- </div>-->
		</div>
	</NuxtLink>
</template>
<script lang="ts" src="./SideBarEntry.ts"></script>
<style type="text/css" src="./SideBarEntry.css"></style>
