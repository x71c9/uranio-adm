<template>
	<table :class="{'ui-all-table': true, 'ui-read-only-table': is_read_only}">
		<thead>
			<tr class="ui-all-table-row ui-all-table-row-head">
				<th
					v-if="is_read_only === false"
					class="check"
					@click.stop="toggle_all"
					>
					<UICheckbox
						:checked="is_all_checked"
						:indeterminate="is_all_indeterminate"
						/>
				</th>
				<th
					class="sticky">
					<div
						v-if="count_selected > 0"
						>
						<div
							class="ui-button-group bulk-edit-wrapper"
							>
							<UIButton class="small secondary disabled">
								{{ count_selected }} {{ count_label }} selected
							</UIButton>
							<UIButton
								class="small secondary"
								@click.native="edit_selected"
								>
								Bulk edit selected
							</UIButton>
							<UIButton
								class="small secondary red last_right"
								@click.native="delete_selected"
								>
								Delete selected
							</UIButton>
							<div class="divisor"></div>
							<UIButton
								class="small secondary first_left"
								@click.native="edit_all"
								>
								Bulk edit all {{ plural }}
							</UIButton>
							<UIButton
								class="small secondary red"
								@click.native="delete_all"
								>
								Delete all {{ plural }}
							</UIButton>
						</div>
					</div>
					<div v-else>
						_id
					</div>
				</th>
				<th
					v-for="(prop_key, index) in primary_properties"
					:key="prop_key"
					>
					<span
						class="th-span"
						:class="{hidden: count_selected > 0}"
						>
					{{ prop_key }}
					</span>
				</th>
				<th class="right">
					_date
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-if="atoms.length === 0"
				class="ui-all-table-row"
				>
				<td
					class="check"
					>
				</td>
				<td
					class="sticky">
					No atoms match your query
				</td>
			</tr>
			<tr
				v-for="atom in atoms"
				:key="atom._id"
				class="ui-all-table-row"
				>
				<td
					v-if="is_read_only === false"
					class="check"
					>
					<UICheckbox
						@click.native="toggle_atom(atom._id)"
						:checked="_self.checked_by_id[atom._id]"
						/>
				</td>
				<td
					class="sticky">
					<NuxtLink
						:to="`/urn-admin/${atom_name}/${atom._id}`"
						class="ui-active-row monospace"
						>
						<span
							class="span-id"
							v-if="primary_properties.length > 0"
							>
							{{ atom._id.slice(-8) }}
						</span>
						<span v-else>
							{{ atom._id }}
						</span>
									
					</NuxtLink>
				</td>
				<td
					v-for="(prop_key, index) in primary_properties"
					:key="prop_key"
					>
					<NuxtLink
						:to="`/urn-admin/${atom_name}/${atom._id}`"
						class="ui-active-row monospace"
						>
						{{ atom[prop_key] }}
					</NuxtLink>
				</td>
				<td class="secondary right">
					<NuxtLink
						:to="`/urn-admin/${atom_name}/${atom._id}`"
						class="ui-active-row monospace"
						>
						{{ atom._date }}
					</NuxtLink>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script lang="ts" src="./AllTable.ts"></script>
