<template>
	<transition name="notif">
		<div
			v-show="$store.state.notification.active"
			class="ui-notification-wrapper"
			:class="$store.state.notification.type.toLowerCase()"
			>
			<img
				v-show="$store.state.notification.type === 'INFO'"
				class="icon" src="/img/icons/@2x/icon-62@2x.png"
				>
			<img
				v-show="$store.state.notification.type === 'SUCCESS'"
				class="icon" src="/img/icons/@2x/icon-63@2x.png"
				>
			<img
				v-show="$store.state.notification.type === 'WARN'"
				class="icon" src="/img/icons/@2x/icon-64@2x.png"
				>
			<img
				v-show="$store.state.notification.type === 'ERROR'"
				class="icon" src="/img/icons/@2x/icon-65@2x.png"
				>
			<div class="text">
				<div class="title">
					{{ $store.state.notification.message }}
				</div>
				<!-- <div class="surname"> -->
				<!--   Long text sample -->
				<!-- </div> -->
			</div>
			<img
				class="close"
				src="/img/icons/@2x/close-9@2x.png"
				v-on:click="close_notification"
				>
		</div>
	</transition>
</template>
<script lang="ts" src="./Notification.ts"></script>
