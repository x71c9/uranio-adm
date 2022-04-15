<template>
	<div>
		<draggable
			class="drag-wrapper"
			:class="{dragging}"
			v-if="molecule[prop_name].length"
			v-model="molecule[prop_name]"
			:group="{put: prop_name, name: prop_name}"
			@start="drag_start()"
			@end="drag_end()"
			v-bind="drag_options"
			handle=".drag_handle"
			>
			<li
				class="ui-li-element ui-li-atom"
				v-for="subatom in molecule[prop_name]"
				:key="subatom._id"
				>
				<div
					v-if="molecule[prop_name].length > 1"
					class="drag_handle">
					<img src="/img/icons/png/menu.png"/>
				</div>
				<div class="name">
					<span
						v-for="prop_name in prop_primary_properties"
						:key="prop_name"
						>
					{{ subatom[prop_name] }}
					</span>
				</div>
				<UIButton
					class="visit small secondary">
					<NuxtLink
						:to="`/urn-admin/${prop_atom_name}/${subatom._id}`"
						>
						<img src="/img/icons/png/insert_link.png" />
						Visit
					</NuxtLink>
				</UIButton>
				<UIButton
					class="small secondary red"
					@click.native.prevent="remove(subatom._id)"
					>
					Remove
				</UIButton>
			</li>
		</draggable>
		<div style="display: none;">
			<input
				v-for="subatom in molecule[prop_name]"
				class="urn_input"
				type="hidden"
				:key="subatom._id"
				:name="prop_name"
				:value="subatom._id"
				>
		</div>
		<UIButton
			class="secondary add_button"
			@click.native.prevent="add"
			>Add</UIButton>
	</div>
</template>
<script lang="ts" src="./ATOMARRAY.ts"></script>
<style>
</style>
