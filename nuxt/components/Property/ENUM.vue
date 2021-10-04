<template>
	<div>
		<select
			class="urn_input"
			:name="prop_name"
			v-on:change="on_change"
			>
			<option
				v-for="option in enum_values"
				:key="option"
				:selected="option == atom[prop_name]"
				:value="option"
				>
				{{ option }}
			</option>
		</select>
	</div>
</template>
<script lang="ts" src="./ENUM.ts"></script>
