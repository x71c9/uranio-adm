<template>
	<div class="ui-object">
		<div v-for="(value, key) of obj">
			<div v-if="typeof value !== 'object' && !Array.isArray(value)">
				<h2>{{ key }}</h2>
				{{ value }}
				<br>
				<br>
			</div>
			<div v-else-if="Array.isArray(value)">
				<div v-for="(array_value, array_key) of value">
					<UIObjectInspector :obj="array_value"/>
				</div>
			</div>
			<div v-else-if="typeof value === 'object'">
				<UIObjectInspector :obj="value"/>
			</div>
		</div>
		<br>
	</div>
</template>
<script lang="ts" src="./ObjectInspector.ts"></script>
<style type="text/css" src="./ObjectInspector.css"></style>
