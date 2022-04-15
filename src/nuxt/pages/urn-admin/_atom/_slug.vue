<template>
	<div class="ui-atom-slug urn-single-page">
		<div v-if="success">
			<div class="flex-row-3">
				<h1
					class="ui-flex-row-3-el today inter-medium-white-36px"
					v-on:click="$router.go()"
					>
					<span class="inter-medium-white-36px">{{ title }}</span>
					<span class="ui-atom-name">({{ atom_name }})</span>
				</h1>
				<div
					class="ui-flex-row-3-el header_actions"
					v-if="is_read_only === false"
					>
					<UIButton v-on:click.native="external_submit">Save</UIButton>
					<!-- <UIButton v-on:click.native="external_submit_exit">Save / Exit</UIButton> -->
				</div>
			</div>
			<div class="flex-row-4">
				<UIButton
					class="borderless secondary back_button"
					v-on:click.native="go_back()"
					>
					<img src="/img/icons/png/arrow_back.png" />
					<span>{{ back_label }}</span>
				</UIButton>
				<h2 class="monospace">_id: {{ _self.molecule._id }}</h2>
			</div>
			
			<FormAtom
				v-if="is_read_only === false"
				ref="atom_form"
				@submit_atom_form="submit"
				@submit_exit_atom_form="submit_exit"
				@go_back="go_back"
				@delete_atom="delete_atom"
				call="update"
				/>
			
			<ModalAtom @atom_selected="modal_atom_selected"/>
		</div>
		<div v-else>
			<Error
				:message="message"
				:error="error_object"
				/>
		</div>
		<Raw :data="data_object"/>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
