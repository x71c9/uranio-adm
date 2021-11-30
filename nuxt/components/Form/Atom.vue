<template>
	<form
		class="ui-property-wrapper"
		@submit.prevent="submit"
		@keydown.enter.prevent
		@keyup.enter.prevent
		autocomplete="off"
		>
		<Property
			v-for="(property, prop_name) in atom_props"
			:key="prop_name"
			:prop="property"
			v-on:change.native="on_change(prop_name)"
			v-on:keyup.native="on_keyup(prop_name)"
			></Property>
			<div class="ui-single-footer">
				<div class="left">
					<UIButton
						class="secondary"
						v-on:click.native="$router.back()"
						>Cancel</UIButton>
					<UIButton
						v-if="call === 'update'"
						class="secondary red"
						@click.prevent="delete_atom"
						>Delete</UIButton>
				</div>
				<div class="right">
					<UIButton type="submit">Save</UIButton>
				</div>
			</div>
	</form>
</template>
<script lang="ts" src="./Atom.ts"></script>
