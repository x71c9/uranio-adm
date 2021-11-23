<template>
	<table class="ui-all-table">
		<thead>
			<tr class="ui-all-table-row ui-all-table-row-head">
				<th
					class="check"
					@click.stop="toggle_all"
					>
					<UICheckbox />
				</th>
				<th>
					_id
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
						:checked="_self.checked[atom._id]"
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
