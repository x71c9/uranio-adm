<template>
	<div>
		<div v-if="molecule[prop_name]">
			<div
				class="ui-li-element ui-li-atom"
				>
				<div class="name">
					{{ molecule[prop_name] }}
				</div>
				<UIButton
					class="visit small secondary">
					<NuxtLink
						:to="`/urn-admin/${prop_atom_name}/${molecule[prop_name]}`"
						>
						<img src="/img/icons/png/insert_link.png" />
						Visit
					</NuxtLink>
				</UIButton>
				<UIButton
					class="small secondary red"
					@click.native.prevent="remove"
					>
					Remove
				</UIButton>
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
				:value="molecule[prop_name]"
				>
		</div>
	</div>
</template>
<script lang="ts" src="./ATOM.ts"></script>
