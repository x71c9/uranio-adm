<template>
	<div>
		<div v-if="success">
			<Uploader
				v-if="atom_name === 'media' && this.page.index === 0"
				v-on:add-atoms="add_atoms"
				/>
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ plural }}</span>
				</h1>
				<div
					class="ui-flex-row-3-el header_actions"
					v-show="atom_name !== 'media'"
					>
					<nuxt-link
						:to="`/urn-admin/${atom_name}/new`"
						v-if="is_read_only === false"
						>
						<UIButton>+ &nbsp;Add {{ atom_name }}</UIButton>
					</nuxt-link>
					<UIButton class="borderless">Export</UIButton>
					<UIButton
						v-if="is_read_only === false"
						class="borderless">Import</UIButton>
				</div>
			</div>
			<div class="surname inter-normal-white-20px">
				<span class="inter-normal-white-20px">lorem ipsum dolor sit amet</span>
			</div>
			<div v-if="page.total_atom_count > 0">
				<UIGroup>
					<UIAllBodyHeader />
					<div class="ui-all-body">
						<UIAllTable/>
					</div>
				</UIGroup>
				<UIPagination />
			</div>
			<div
				v-else
				class="no_atom_yet"
				>
				There are no {{ atom_name }} in the database yet.
			</div>
		</div>
		<div v-else>
			<Error
				class="ui-all-slug-error"
				:message="message"
				:error="error_object"
				/>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
