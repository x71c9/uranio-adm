<template>
	<div>
		<input
			autocomplete="off"
			class="urn_input"
			type="email"
			:name="prop_name"
			v-model="atom[prop_name]"
			>
	</div>
</template>
<script lang="ts" src="./EMAIL.ts"></script>
