<template>
	<div v-if="$store.state.modalAtom.is_open">
		<ul>
			<li
				v-for="atom in $store.state.modalAtom.atoms"
				:key="atom._id"
				:class="{ 'selected' : $store.state.modalAtom.selected_atoms[atom._id] === true}"
				@click.prevent="select(atom._id)"
				>
				<span v-if="$store.state.modalAtom.selected_atoms[atom._id]">SSS &nbsp;</span>
				{{ atom._id }}
			</li>
		</ul>
		<button @click.prevent="close">Close</button>
		<button @click.prevent="submit">Sumbit</button>
	</div>
</template>
<script lang="ts" src="./Atom.ts"></script>
