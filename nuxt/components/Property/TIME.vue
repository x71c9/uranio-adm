<template>
	<div>
		<input
			class="urn_input"
			type="datetime-local"
			step="1"
			:name="prop_name"
			:value="value"
			v-on:input="on_input"
			>
	</div>
</template>
<script lang="ts" src="./TIME.ts"></script>
