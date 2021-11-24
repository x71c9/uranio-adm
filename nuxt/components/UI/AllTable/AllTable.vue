<template>
	<table class="ui-all-table">
		<thead>
			<tr class="ui-all-table-row ui-all-table-row-head">
				<th
					class="check"
					@click.stop="toggle_all"
					>
					<UICheckbox
						:checked="is_all_checked"
						:indeterminate="is_all_indeterminate"
						/>
				</th>
				<th>
					<div
						v-if="count_selected > 0"
						>
						<div class="ui-button-group">
							<UIButton class="small secondary disabled">
								{{ count_selected }} {{ count_label }} selected
							</UIButton>
							<UIButton class="small secondary">Bulk edit</UIButton>
							<UIButton class="small secondary red">Delete</UIButton>
						</div>
					</div>
					<div v-else>
						_id
					</div>
				</th>
				<th class="right">
					_date
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="atom in atoms"
				:key="atom._id"
				class="ui-all-table-row"
				>
				<td
					class="check"
					>
					<UICheckbox
						@click.native="toggle_atom(atom._id)"
						:checked="_self.checked_by_id[atom._id]"
						/>
				</td>
				<td>
					<NuxtLink
						:to="`/urn-admin/${atom_name}/${atom._id}`"
						class="ui-active-row monospace"
						>
						{{ atom._id }}
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
