<template>
	<div>
		<input
			class="urn_input"
			type="hidden"
			:name="prop_name"
			:value="atom[prop_name]"
			v-on:input="$emit('input', $event.target.value)"
			>
	</div>
</template>
<script lang="ts" src="./HIDDEN.ts"></script>
