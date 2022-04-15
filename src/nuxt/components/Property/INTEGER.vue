<template>
	<div>
		<input
			ref="input"
			class="urn_input"
			type="number"
			step="1"
			:name="prop_name"
			:value="molecule[prop_name]"
			v-on:input="on_input"
			>
	</div>
</template>
<script lang="ts" src="./INTEGER.ts"></script>
