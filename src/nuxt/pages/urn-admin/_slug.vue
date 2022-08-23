<template>
	<div>
		<div v-if="success">
			<Uploader
				v-if="atom_name === '_media' && page_query.index === 0"
				v-on:add-atom="add_atom"
				/>
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<nuxt-link
						:to="`/urn-admin/${atom_name}`"
						class="title_link inter-medium-white-36px">
						{{ title }}
					</nuxt-link>
				</h1>
				<div
					class="ui-flex-row-3-el header_actions"
					v-show="atom_name !== '_media'"
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
			<div v-if="empty_relation === false">
				<UIGroup>
					<UIAllBodyHeader
						v-on:search="search_atoms"
					/>
					<div class="ui-all-body">
						<UIAllTable
							v-if="page_data.total_result > 0"
							ref="allTable"
							v-on:delete_atoms="delete_atoms"
							v-on:delete_all_atoms="delete_all_atoms"
						/>
						<div
							v-else
							class="no_matching"
						>
							No atoms match your query.
						</div>
					</div>
				</UIGroup>
				
				<UIPagination />
				
				<!-- @modal_atom_bulk_edit_selected="modal_atom_bulk_edit_selected" -->
				<ModalEdit
					@submit="update_atoms"
				/>
				
				<!-- <ModalAtom @atom_selected="modalAtomSelected"/> -->
				
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
