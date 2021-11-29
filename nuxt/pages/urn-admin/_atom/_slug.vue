<template>
	<div>
		<div v-if="success">
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ title }}</span>
					<span class="ui-atom-name">({{ atom_name }})</span>
				</h1>
				<div class="ui-flex-row-3-el">
					<UIButton>Save</UIButton>
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
				<h2 class="monospace">_id: {{ _self.atom._id }}</h2>
			</div>
			<form
					class="ui-property-wrapper"
					@submit.prevent="submit"
					@keydown.enter.prevent
					@keyup.enter.prevent
					autocomplete="off"
				>
					<Property
						v-for="property in atom_props" :key="property.name"
						:prop_name="property.name"
						:prop_style="property.style"
						:optional="property.optional"
						></Property>
					
					<div class="ui-single-footer">
						<div class="left">
							<UIButton
								class="secondary"
								v-on:click.native="$router.back()"
								>Cancel</UIButton>
							<UIButton class="secondary red" @click.prevent="delete_atom">Delete</UIButton>
						</div>
						<div class="right">
							<UIButton type="submit">Save</UIButton>
						</div>
					</div>
					
			</form>
			<ModalAtom @atom_selected="modalAtomSelected"/>
		</div>
		<div v-else>
			<strong>{{ message }}</strong>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
