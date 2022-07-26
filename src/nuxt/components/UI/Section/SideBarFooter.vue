<template>
	<div class="side-bar-group side-bar-group-footer">
		<UISideBarEntry
			v-if="items.length > 0"
			:entry="items[0]">
		</UISideBarEntry>
		<button class="x1-one-line-7" v-on:click="sign_out">
			<img class="icon" src="/img/icons/@2x/icon-221@2x.png">
			<div class="label-10 inter-normal-white-16px">
				<span class="inter-normal-white-16px">log out</span>
			</div>
		</button>
	</div>
</template>
<script lang="ts" src="./SideBarFooter.ts"></script>
