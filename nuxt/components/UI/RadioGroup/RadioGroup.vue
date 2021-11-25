<template>
	<div class="ui-radio-group ui-sort-list-wrapper">
		<div
			v-for="(item, index) of this.items"
			:class="{selected: item.selected}"
			class="sort-item"
			>
			<UIRadioButton /> <span>{{ item.label }}</span>
		</div>
	</div>
</template>
<script lang="ts" src="./RadioGroup.ts"></script>
<style lang="scss" src="./RadioGroup.scss"></style>
