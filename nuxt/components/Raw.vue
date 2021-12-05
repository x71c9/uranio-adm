<template>
	<div class="ui-raw-data">
		<div
			class="ui-raw-header"
			@click="open = !open"
			>
			<img v-show="open === false" src="/img/icons/png/chevron_right.png">
			<img v-show="open === true" src="/img/icons/png/expand_more.png">
			<h2>TRX Raw Data</h2>
		</div>
		<UIObjectInspector
			:data="data"
			v-show="open"
			/>
	</div>
</template>
<script lang="ts" src="./Raw.ts"></script>
