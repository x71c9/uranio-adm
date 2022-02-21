<template>
	<div class="urn-modal-atom" v-if="$store.state.modalAtom.is_open">
		<div class="modal-atom-body">
			<h2 class="inter-medium-white-36px">Select atom</h2>
			<ul class="modal-atom-list">
				<li
					v-for="atom in $store.state.modalAtom.atoms"
					:key="atom._id"
					class="ui-li-element ui-li-modal-el"
					:class="{selected: $store.state.modalAtom.selected_atoms[atom._id]}"
					@click.prevent="select(atom._id)"
					>
						<img
							v-show="$store.state.modalAtom.selected_atoms[atom._id]"
							src="/img/icons/png/check.png"
							/>
						{{ atom._id }}
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
