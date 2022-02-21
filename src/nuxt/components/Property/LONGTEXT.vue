<template>
	<div>
		<textarea
			ref="input"
			class="urn_input"
			type="text"
			:name="prop_name"
			v-model="atom[prop_name]"
			>{{ atom[prop_name] }}</textarea>
	</div>
</template>
<script lang="ts" src="./LONGTEXT.ts"></script>
