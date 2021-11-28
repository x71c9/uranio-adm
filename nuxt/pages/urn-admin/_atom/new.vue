<template>
	<!-- <div v-on:atom_selected="modal_atom_selected">-->
	<div>
		<div class="flex-row-3">
			<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
				<span class="inter-medium-white-36px">New {{ atom_name }}</span>
			</h1>
			<div class="ui-flex-row-3-el">
				<UIButton>Insert</UIButton>
			</div>
		</div>
		<div class="flex-row-4">
			<UIButton
				class="borderless secondary back_button"
				v-on:click.native="$router.back()"
				>
				<img src="/img/icons/png/arrow_back.png" />
				<span> back to {{ plural }}</span>
			</UIButton>
			<!-- <h2 class="monospace">_id: {{ _self.atom._id }}</h2> -->
		</div>
		<form
			@submit.prevent="submit"
			@keydown.enter.prevent @keyup.enter.prevent
			class="ui-property-wrapper"
			>
			<Property
				v-for="(val, property) in atom" :key="property"
				:prop_name="property"
				:atom_name="atom_name"
				:prop_value="atom"
				v-on:input="atom[property] = $event"
				>
			</Property>
			<UIButton type="submit">Insert</UIButton>
		</form>
		<ModalAtom @atom_selected="modalAtomSelected"/>
	</div>
</template>
<script lang="ts" src="./new.ts"></script>
