<template>
	<!-- <div v-on:atom_selected="modal_atom_selected">-->
	<div>
		<button @click.prevent="$router.back()">Back</button>
		<form @submit.prevent="submit" @keydown.enter.prevent @keyup.enter.prevent>
			<div v-for="(val, property) in atom" :key="property">
				<Property
					:prop_name="property"
					:atom_name="atom_name"
					:prop_value="atom"
					v-on:input="atom[property] = $event"
					>
				</Property>
			</div>
			<button type="submit">Insert</button>
		</form>
		<ModalAtom @atom_selected="modalAtomSelected"/>
		<!-- <ModalAtom />-->
	</div>
</template>
<script lang="ts" src="./new.ts"></script>
