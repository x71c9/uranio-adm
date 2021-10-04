<template>
	<div>
		<ul>
			<li v-for="(el, i) in value" :key="`${el}${i}`">
				<label>{{ el }}</label>
				<button
					@click.prevent="remove_element(el)"
					>
					X
				</button>
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
		<input
			:type="type"
			:name="prop_name"
			v-model="new_element"
			@keyup.enter="add_element"
			>
		<button
			@click.prevent="add_element"
			>
			Add
		</button>
	</div>
</template>
<script lang="ts" src="./SET.ts"></script>
