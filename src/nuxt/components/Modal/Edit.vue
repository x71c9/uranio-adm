<template>
	<div class="urn-modal-aside urn-modal-edit" v-if="$store.state.modal_edit.is_open">
		<div class="modal-edit-body">
			<h2 class="inter-medium-white-36px">Edit atoms</h2>
			<FormAtom
				ref="edit_atom_form"
				@submit_atom_form="submit_bulk_edit"
				@submit_exit_atom_form="submit_bulk_edit"
				@go_back="close"
				call="BULK_EDIT"
				/>
		</div>
		<!-- <div class="modal-atom-footer"> -->
		<!-- 	<UIButton class="secondary" @click.native.prevent="close">Close</UIButton> -->
		<!-- 	<UIButton @click.native.prevent="submit">Sumbit</UIButton> -->
		<!-- </div> -->
		<ModalAtom @atom_selected="modal_atom_bulk_edit_selected"/>
	</div>
</template>
<script lang="ts" src="./Edit.ts"></script>
