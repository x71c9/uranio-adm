<template>
	<div class="ui-object-array">
		<div
			v-for="(value, index) in data"
			:key="`ai${index}`"
			>
			<UIArrayInspector
				v-if="Object.prototype.toString.call(value) === '[Object Array]'"
				:data="value"
				:name="`na${index}`"
				/>
			<UIObjectInspector
				v-else-if="value !== null && typeof value === 'object'"
				:data="value"
				:name="`no${index}`"
				/>
			<div
				v-else
				>
				{{ value }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./ArrayInspector.ts"></script>
