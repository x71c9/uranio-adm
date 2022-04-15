<template>
	<div>
		<textarea
			ref="input"
			class="urn_input"
			type="text"
			:name="prop_name"
			v-model="molecule[prop_name]"
			>{{ molecule[prop_name] }}</textarea>
	</div>
</template>
<script lang="ts" src="./LONGTEXT.ts"></script>
