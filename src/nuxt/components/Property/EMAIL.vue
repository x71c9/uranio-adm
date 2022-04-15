<template>
	<div>
		<input
			ref="input"
			:readonly="readonly"
			autocomplete="off"
			class="urn_input"
			type="email"
			:name="prop_name"
			v-model="molecule[prop_name]"
			>
	</div>
</template>
<script lang="ts" src="./EMAIL.ts"></script>
