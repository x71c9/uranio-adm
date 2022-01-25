<template>
	<div>
		<div class="flex-row-3">
			<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
				<span class="inter-medium-white-36px">New {{ atom_name }}</span>
			</h1>
			<div class="ui-flex-row-3-el header_actions">
				<UIButton v-on:click.native="external_submit">Save</UIButton>
			</div>
		</div>
		<div class="flex-row-4">
			<UIButton
				class="borderless secondary back_button"
				v-on:click.native="go_back()"
				>
				<img src="/img/icons/png/arrow_back.png" />
				<span> back to {{ plural }}</span>
			</UIButton>
		</div>
		
		<FormAtom
			ref="atom_form"
			@submit_atom_form="submit"
			@submit_exit_atom_form="submit_exit"
			call="insert"
			/>
		
		<ModalAtom @atom_selected="modalAtomSelected"/>
	</div>
</template>
<script lang="ts" src="./new.ts"></script>
