<template>
	<div>
		<input
			ref="input"
			class="urn_input"
			type="text"
			:name="prop_name"
			v-model="molecule[prop_name]"
			>
	</div>
</template>
<script lang="ts" src="./TEXT.ts"></script>
