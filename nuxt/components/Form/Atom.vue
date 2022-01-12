<template>
	<form
		class="ui-property-wrapper"
		:class="{error: error_class}"
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
				<div class="gradient"></div>
				<div class="full-bg">
					<div class="left">
						<UIButton
							class="secondary"
							v-on:click.native.prevent="go_back"
							>Cancel</UIButton>
						<UIButton
							v-if="call === 'update'"
							class="secondary red"
							@click.native.prevent="delete_atom"
							>Delete</UIButton>
					</div>
					<div class="right">
						<UIButton type="submit">Save</UIButton>
						<UIButton
							v-if="call === 'update'"
							@click.native.prevent="submit_exit"
							>Save / Exit</UIButton>
					</div>
				</div>
			</div>
	</form>
</template>
<script lang="ts" src="./Atom.ts"></script>
