<template>
	<div>
		<select
			ref="input"
			class="urn_input"
			:name="prop_name"
			v-on:change="on_change"
			>
			<option disabled="disabled" selected>Select {{ prop_label }}</option>
			<option
				v-for="(option, index) in enum_values"
				:key="option"
				:selected="option == molecule[prop_name]"
				:value="option"
				>
				{{ option }}
			</option>
		</select>
	</div>
</template>
<script lang="ts" src="./ENUM.ts"></script>
