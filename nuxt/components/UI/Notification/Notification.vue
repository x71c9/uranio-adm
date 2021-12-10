<template>
	<div
		class="ui-notification-wrapper"
		:class="`${type}`"
		>
		<img v-show="type === 'info'" class="icon" src="/img/icons/@2x/icon-62@2x.png">
		<img v-show="type === 'success'" class="icon" src="/img/icons/@2x/icon-63@2x.png">
		<img v-show="type === 'warn'" class="icon" src="/img/icons/@2x/icon-64@2x.png">
		<img v-show="type === 'error'" class="icon" src="/img/icons/@2x/icon-65@2x.png">
		<div class="text">
			<div class="title">
				Title
			</div>
			<div class="surname">
				Long text sample
			</div>
		</div>
		<img class="close" src="/img/icons/@2x/close-9@2x.png">
	</div>
</template>
<script lang="ts" src="./Notification.ts"></script>
<style lang="scss" src="./Notification.scss"></style>
