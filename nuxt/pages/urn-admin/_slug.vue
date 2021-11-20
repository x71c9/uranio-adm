<template>
	<div>
		<div v-if="success">
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ plural }}</span>
				</h1>
				<div class="ui-flex-row-3-el">
					<UIButton>Add Product</UIButton>
					<UIButton class="borderless">Export</UIButton>
					<UIButton class="borderless">Import</UIButton>
				</div>
			</div>
			<NuxtLink :to="`/urn-admin/${atom_name}/new`">
				<span>New {{ _self.atom_name }}</span>
			</NuxtLink>
			<ul>
				<li v-for="atom in atoms" :key="atom._id">
					<NuxtLink :to="`/urn-admin/${atom_name}/${atom._id}`">
						{{ atom._id }}
					</NuxtLink>
				</li>
			</ul>
			<div v-if="atoms.length > 2">
				Pagination
			</div>
		</div>
		<div v-else>
			<strong>{{ message }}</strong>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
