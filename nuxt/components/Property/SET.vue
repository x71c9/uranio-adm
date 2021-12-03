<template>
	<div>
		<ul>
			<li v-for="(el, i) in value" :key="`${el}${i}`">
				<label>{{ el }}</label>
				<UIButton class="secondary small red" @click.native.prevent="remove_element(el)">X</UIButton>
			</li>
		</ul>
		<div style="display: none;">
			<input
				v-for="(el, i) in value"
				class="urn_input"
				type="hidden"
				:key="`${el}${i}`"
				:name="prop_name"
				:value="el"
				>
		</div>
		<div class="ui-set-add-wrapper">
			<input
				ref="input"
				:type="type"
				:name="prop_name"
				v-model="new_element"
				@keyup.enter="add_element"
				>
			<UIButton class="secondary" @click.native.prevent="add_element">Add</UIButton>
		</div>
	</div>
</template>
<script lang="ts" src="./SET.ts"></script>
