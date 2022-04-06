<template>
	<div class="ui-object-array">
		<div
			v-for="(value, index) of data"
			:key="index"
			>
			<UIArrayInspector
				v-if="Object.prototype.toString.call(value) === '[Object Array]'"
				:data="value"
				/>
			<UIObectInspector
				v-else-if="value !== null && typeof value === 'object'"
				:data="value"
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
