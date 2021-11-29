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
			<!-- :prop_value="atom" -->
			<Property
				v-for="(val, property) in atom" :key="property"
				:prop_name="property"
				:prop_style="prop_styles[property]"
				:optional="prop_optionals[property]"
				:atom_name="atom_name"
				v-on:input="atom[property] = $event"
				>
			</Property>
			<div class="ui-single-footer">
				<div class="left">
					<UIButton
						class="secondary"
						v-on:click.native="$router.back()"
						>Cancel</UIButton>
				</div>
				<div class="right">
					<UIButton type="submit">Insert</UIButton>
				</div>
			</div>
		</form>
		<ModalAtom @atom_selected="modalAtomSelected"/>
	</div>
</template>
<script lang="ts" src="./new.ts"></script>
