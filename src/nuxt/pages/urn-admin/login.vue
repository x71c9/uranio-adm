<template lang="pug">
	.auth_wrapper
		.auth_box
			h1 Uranio Login
			form
				.auth_input
					.head
						label Email
						button Forgot?
						.info
							.prop_data.monospace
								img(src='/img/icons/png/email.png')
								| email
					.body
						input(type='email' placeholder='Email')
				.auth_input
					.head
						label Email
						button Forgot?
						.info
							.prop_data.monospace
								img(src='/img/icons/png/vpn_key.png')
								| password
					.body
						input(type='password' placeholder='Password')
				.auth_input.submit
					input.button(type='submit' value="Submit")
</template>
<script lang="ts" src="./login.ts"></script>
