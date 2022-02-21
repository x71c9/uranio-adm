<template>
		<!-- :class="{checked: is_checked, disabled: is_disabled, indeterminate: is_indeterminate}" -->
		<!-- @click="toggle" -->
	<div
		class="checkbox"
		:class="{checked, disabled, indeterminate}"
		>
		<img class="state-checked" src="/img/icons/@2x/checkbox-1@2x.png" />
		<img class="state-disabled" src="/img/icons/@2x/checkbox-2@2x.png" />
		<img class="state-indeterminate" src="/img/icons/@2x/checkbox-3@2x.png" />
		<input type="checkbox" name="">
		<!-- <slot></slot> -->
	</div>
</template>
<script lang="ts" src="./Checkbox.ts"></script>
<style type="text/css" src="./Checkbox.css"></style>
