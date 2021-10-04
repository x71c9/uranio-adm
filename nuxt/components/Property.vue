<template>
	<div>
		<label v-if="prop_type != 'Empty' && prop_type != 'PropertyHIDDEN'">
			<strong>{{ prop_label }}</strong>
		</label>
		<component :is="prop_type"></component>
		<br>
	</div>
</template>
<script lang="ts" src="./Property.ts"></script>
