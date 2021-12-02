<template>
	<div>
		<ul v-if="atom[prop_name].length">
			<li v-for="atom_id in atom[prop_name]" :key="atom_id">
				<NuxtLink :to="`/urn-admin/${prop_atom_name}/${atom_id}`">
					{{ atom_id }}
				</NuxtLink>
				<UIButton class="small secondary red" @click.native.prevent="remove(atom_id)">X</UIButton>
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
		<UIButton class="secondary" @click.native.prevent="add">Add</UIButton>
	</div>
</template>
<script lang="ts" src="./ATOMARRAY.ts"></script>
