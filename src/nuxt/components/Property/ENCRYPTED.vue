<template>
	<div>
		<input
			ref="input"
			:readonly="readonly"
			autocomplete="new-password"
			class="urn_input"
			type="password"
			:name="prop_name"
			v-model="atom[prop_name]"
			>
	</div>
</template>
<script lang="ts" src="./ENCRYPTED.ts"></script>
