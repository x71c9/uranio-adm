<template>
	<div class="urn-modal-aside urn-modal-atom" v-if="$store.state.modal_atom.is_open">
		<div class="modal-atom-body">
			<h2 class="inter-medium-white-36px">Select atom</h2>
			<ul class="modal-atom-list">
				<li
					v-for="atom in $store.state.modal_atom.atoms"
					:key="atom._id"
					class="ui-li-element ui-li-modal-el"
					:class="{selected: $store.state.modal_atom.selected[atom._id]}"
					@click.prevent="select(atom._id)"
					>
						<img
							v-show="$store.state.modal_atom.selected[atom._id]"
							src="/img/icons/png/check.png"
							/>
						<span
							v-for="prop_name in $store.state.modal_atom.primary_properties"
							:key="prop_name"
							>
						{{ atom[prop_name] }}
						</span>
				</li>
			</ul>
		</div>
		<div class="modal-atom-footer">
			<UIButton class="secondary" @click.native.prevent="close">Close</UIButton>
			<UIButton @click.native.prevent="submit">Sumbit</UIButton>
		</div>
	</div>
</template>
<script lang="ts" src="./Atom.ts"></script>
