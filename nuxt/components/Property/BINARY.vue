<template>
	<div>
		<input
			:id="`${prop_name}.false`"
			class="urn_input"
			type="radio"
			:name="prop_name"
			value="false"
			v-on:input="on_input"
			:checked="atom[prop_name] == false"
			>
			<label
				:for="`${prop_name}.false`"
				>
				False
			</label>
		<input
			:id="`${prop_name}.true`"
			class="urn_input"
			type="radio"
			:name="prop_name"
			value="true"
			v-on:input="on_input"
			:checked="atom[prop_name] == true"
			>
			<label
				:for="`${prop_name}.true`"
				>
				True
			</label>
	</div>
</template>
<script lang="ts" src="./BINARY.ts"></script>
