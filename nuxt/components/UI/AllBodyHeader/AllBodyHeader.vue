<template>
	<div class="ui-all-header">
		<div
			class="ui-all-header-el ui-all-header-search"
			:class="{focus: search_input_focused}"
			>
			<img class="icon-12" src="/img/icons/png/search.png">
			<input
				class="search-input inter-normal-white-16px-2"
				type="text"
				name="search_all"
				placeholder="Search"
				@focus="search_input_focused = true"
				@blur="search_input_focused = false"
				/>
		</div>
		<div class="ui-all-header-el ui-all-header-sort">
			<UIButton
				class="secondary"
				@click.native="toggle_sort_list()"
				>
				<img class="icon-sort" src="/img/icons/png/swap_vert.png" />
				<span>Sort</span>
			</UIButton>
			<div
				ref="sort_list"
				@blur="on_sort_list_blur"
				tabindex="0"
				class="ui-sort-list"
				:class="{visible: sort_list_visible}"
				>
				<span class="sort-label">Sort by</span>
				<UIRadioGroup
					:items="sort_items"
					@click.native="update_sort"
					>
				</UIRadioGroup>
			</div>
		</div>
		<div class="ui-all-header-info">
			<div class="info-item">
				<img src="/img/icons/png/horizontal_split.png"/>
				Total {{ total_label }}:
				<span class="monospace">{{ total_atom_count_format }}</span>
			</div>
			<div class="info-item">
				<img src="/img/icons/png/power.png"/>
				Connection:
				<span class="monospace">{{ connection }}</span>
			</div>
			<div class="info-item">
				<img src="/img/icons/png/link.png"/>
				Dock url:
				<span class="monospace">{{ dock_url }}</span>
			</div>
			<div class="info-item right">
				<img src="/img/icons/png/sort.png">
				Sorted by:
				<span class="monospace">{{ sorted_by }}</span>
				<img v-if="sorted_direction == -1" src="/img/icons/png/arrow_upward.png">
				<img v-if="sorted_direction == 1" src="/img/icons/png/arrow_downward.png">
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./AllBodyHeader.ts"></script>
