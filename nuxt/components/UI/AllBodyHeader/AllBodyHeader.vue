<template>
	<div class="ui-all-header">
		<div class="ui-all-header-el ui-all-header-search">
			<img class="icon-12" src="/img/icons/png/search.png">
			<input
				class="search-input inter-normal-white-16px-2"
				type="text"
				name="search_all"
				placeholder="Search"
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
				<!-- @blur="on_sort_list_blur" -->
				<!-- ref="sort_list" -->
				<!-- tabindex="0" -->
			<div
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
	</div>
</template>
<script lang="ts" src="./AllBodyHeader.ts"></script>
