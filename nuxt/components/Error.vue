<template>
	<div class="ui-error">
		<div class="flex-row-3">
			<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
				<span class="inter-medium-white-36px">{{ message }}</span>
			</h1>
			<div class="ui-flex-row-3-el header_actions">
				<UIButton class="secondary" v-on:click.native="$router.go()">Reload</UIButton>
				<UIButton v-if="error.status === 404" class="secondary" v-on:click.native="$router.back()">Back</UIButton>
			</div>
		</div>
		<br>
		<div class="ui-error-body">
			<UIObjectInspector :data="error" />
		</div>
	</div>
</template>
<script lang="ts" src="./Error.ts"></script>
