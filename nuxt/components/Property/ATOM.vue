<template>
	<div>
		<div v-if="atom[prop_name]">
			<NuxtLink :to="`/urn-admin/${prop_atom_name}/${atom[prop_name]}`">
				{{ atom[prop_name] }}
			</NuxtLink>
			<button @click.prevent="remove">X</button>
		</div>
		<div v-else>
			<button @click.prevent="add">Add</button>
		</div>
		<div style="display: none;">
			<input
				class="urn_input"
				type="hidden"
				:name="prop_name"
				:value="atom[prop_name]"
				>
		</div>
	</div>
</template>
<script lang="ts" src="./ATOM.ts"></script>
