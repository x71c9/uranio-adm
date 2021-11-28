<template>
	<div>
		<div v-if="atom[prop_name]">
			<div class="ui-property-atom-li">
				<NuxtLink :to="`/urn-admin/${prop_atom_name}/${atom[prop_name]}`">
					{{ atom[prop_name] }}
				</NuxtLink>
				<UIButton class="small secondary red" @click.native.prevent="remove">X</UIButton>
			</div>
		</div>
		<div v-else>
			<UIButton class="secondary" @click.native.prevent="add">Add</UIButton>
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
