<template>
	<div>
		<div v-if="success">
			<h2>{{ plural }}</h2>
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
