<template>
	<div>
		<div v-if="success">
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ plural }}</span>
				</h1>
				<div class="ui-flex-row-3-el">
					<nuxt-link :to="`/urn-admin/${atom_name}/new`">
						<UIButton>Add Product</UIButton>
					</nuxt-link>
					<UIButton class="borderless">Export</UIButton>
					<UIButton class="borderless">Import</UIButton>
				</div>
			</div>
			<div class="surname inter-normal-white-20px">
				<span class="inter-normal-white-20px">lorem ipsum dolor sit amet</span>
			</div>
			<UIGroup>
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
				</div>
				<div class="ui-all-body">
					<UIAllTable/>
				</div>
			</UIGroup>
			<UIPagination />
		</div>
		<div v-else>
			<div class="flex-row-3">
				<p class="inter-medium-white-36px">
					{{ message }}
				</p>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
