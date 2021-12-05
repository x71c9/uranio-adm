<template>
	<div>
		<ul v-if="atom[prop_name].length">
			<li
				class="ui-li-element ui-li-atom"
				v-for="atom_id in atom[prop_name]"
				:key="atom_id"
				>
				<div
					v-if="atom[prop_name].length > 1"
					class="drag">
					<img src="/img/icons/png/menu.png"/>
				</div>
				<div class="name">{{ atom_id }}</div>
				<UIButton
					class="visit small secondary">
					<NuxtLink
						:to="`/urn-admin/${prop_atom_name}/${atom_id}`"
						>
						<img src="/img/icons/png/insert_link.png" />
						Visit
					</NuxtLink>
				</UIButton>
				<UIButton
					class="small secondary red"
					@click.native.prevent="remove(atom_id)"
					>
					Remove
				</UIButton>
			</li>
		</ul>
		<div style="display: none;">
			<input
				v-for="atom_id in atom[prop_name]"
				class="urn_input"
				type="hidden"
				:key="atom_id"
				:name="prop_name"
				:value="atom_id"
				>
		</div>
		<UIButton
			class="secondary add_button"
			@click.native.prevent="add"
			>Add</UIButton>
	</div>
</template>
<script lang="ts" src="./ATOMARRAY.ts"></script>
