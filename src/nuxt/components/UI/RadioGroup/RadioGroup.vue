<template>
	<div class="ui-radio-group ui-sort-list-wrapper">
		<div
			v-for="(item, index) of this.items"
			:key="index"
			:class="{selected: item.selected}"
			class="sort-item"
			@click="select_radio(index)"
			>
			<UIRadioButton
				:class="{selected: item.selected}"
			/>
			<span>{{ item.label }}</span>
		</div>
	</div>
</template>
<script lang="ts" src="./RadioGroup.ts"></script>
<style lang="scss" src="./RadioGroup.scss"></style>
