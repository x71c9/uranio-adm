<template>
	<div>
		<ul v-if="atom[prop_name].length">
			<li v-for="atom_id in atom[prop_name]" :key="atom_id">
				<NuxtLink :to="`/urn-admin/${prop_atom_name}/${atom_id}`">
					{{ atom_id }}
				</NuxtLink>
				<button @click.prevent="remove(atom_id)">X</button>
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
		<button @click.prevent="add">Add</button>
	</div>
</template>
<script lang="ts" src="./ATOMARRAY.ts"></script>
