<template>
	<div>
		<input
			class="urn_input"
			type="number"
			:name="prop_name"
			:value="value"
			:step="step"
			v-on:input="on_input"
			>
	</div>
</template>
<script lang="ts" src="./FLOAT.ts"></script>
