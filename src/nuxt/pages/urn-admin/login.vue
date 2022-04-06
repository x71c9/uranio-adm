<template lang="pug">
	.auth_wrapper
		.auth_box
			h1 Uranio Login
			form(
				@submit.prevent="submit"
				@keydown.enter.prevent=""
				@keyup.enter.prevent="submit"
				)
				.auth_input(:class="{'error': error_email}")
					.head
						.top
							label Email
							//button Forgot?
						.info
							.prop_data.monospace
								img(src='/img/icons/png/email.png')
								| email
					.body
						input(
							type='email'
							placeholder='Email'
							v-model='email'
							ref='email'
							)
						.log
							span.error(v-show="error_email")
								img(src='/img/icons/svg/error_outline_red.svg')
								| {{ error_email }}
				.auth_input(:class="{'error': error_password}")
					.head
						.top
							label Password
							button Forgot?
						.info
							.prop_data.monospace
								img(src='/img/icons/png/vpn_key.png')
								| password
					.body
						input(
							type='password'
							placeholder='Password'
							v-model='password'
							ref='password'
							)
						.log
							span.error(v-show="error_password")
								img(src='/img/icons/svg/error_outline_red.svg')
								| {{ error_password }}
				.auth_input.submit
					input.button(
						type='submit'
						value="Submit"
						@click.prevent="submit"
						)
				.msg
					.left
						.version v0.0.62
					.right
						.log(v-show="general_message") {{ general_message }}
						.error(v-show="error_general")
							img(src='/img/icons/svg/error_outline_red.svg')
							| {{ error_general }}
</template>
<script lang="ts" src="./login.ts"></script>
