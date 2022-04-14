<template>
	<div class="pagination inter-normal-chicago-16px">
		<div class="ui-left ui-item-per-page">
			<div class="ui-button-group">
				<UIButton
					:class="{active: page_query.limit === 10}"
					class="secondary"
					>
					<nuxt-link
						:to="limit_link(10)"
						>
						10
					</nuxt-link>
				</UIButton>
				<UIButton
					v-if="page_data.total_result > 25"
					:class="{active: page_query.limit === 25}"
					class="secondary"
					>
					<nuxt-link
						:to="limit_link(25)"
						>
						25
					</nuxt-link>
				</UIButton>
				<UIButton
					v-if="page_data.total_result > 50"
					:class="{active: page_query.limit === 50}"
					class="secondary"
					>
					<nuxt-link
						:to="limit_link(50)"
						>
						50
					</nuxt-link>
				</UIButton>
				<input
					class="pagination_input inter-normal-chicago-16px"
					type="number"
					name="item_per_page"
					min="1"
					:max="128"
					:placeholder="10"
					v-model="item_per_page_value"
					@keyup.enter="change_item_per_page"
					>
			</div>
			<div class="pagination-label">
				<span class="inter-normal-chicago-16px">per page</span>
			</div>
		</div>
		<div
			v-if="page_data.total_pages > 1 && page_data.total_result > page_query.limit"
			class="ui-right"
			>
			<div class="go-to inter-normal-chicago-16px">
				<div class="go-to-1">
					<span class="inter-normal-chicago-16px">Page</span>
				</div>
				<div class="text-field border-1px-mercury">
					<div class="left">
						<input
							class="pagination_input inter-normal-chicago-16px"
							type="number"
							name="go_to_page"
							min="1"
							:max="page_data.total_pages"
							:placeholder="(_self.page_query.index + 1)"
							v-model="change_page_value"
							@keyup.enter="change_page"
							>
					</div>
				</div>
				<div class="text-2">
					<span class="inter-normal-chicago-16px">of {{ page_data.total_pages }}</span>
				</div>
			</div>
			<div class="buttons">
				<!-- Prev text button -->
				<nuxt-link
						v-if="page_data.total_pages <= 4"
						:to="previous_link"
						:event="page_query.index === 0 ? '' : 'click'"
						class="button-text-arrow button-prev border-1px-mercury"
						:class="{disabled: page_query.index == 0}"
						>
					<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
					<div class="text-3">Prev</div>
				</nuxt-link>
				<div class="default">
					<!-- Prev arrow button -->
					<nuxt-link
						v-if="page_data.total_pages > 4"
						:to="previous_link"
						:event="page_query.index === 0 ? '' : 'click'"
						class="pag-button button-arrow button-arrow-left border-1px-mercury"
						:class="{disabled: page_query.index === 0}"
						>
						<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
					</nuxt-link>
					
					<!-- button 1 -->
					<nuxt-link
						:to="page_links[0]"
						class="pag-button"
						:class="{ active: page_query.index === 0 }"
						>
						<div class="text">1</div>
					</nuxt-link>
					
					<div
						v-if="page_query.index >= 3"
						class="text-dots inter-medium-mountain-mist-16px"
						>
						<span class="inter-medium-mountain-mist-16px">...</span>
					</div>
					
					<nuxt-link
						v-for="(page, index) in page_data.total_pages"
						v-if="index > 0 && index > page_query.index - 2 && index < page_query.index + 2 && index < page_data.total_pages - 1"
						:key="index"
						:to="page_links[index]"
						class="pag-button"
						:class="{ active: (index === page_query.index) }"
						>
						<div class="text">
							{{ page }}
						</div>
					</nuxt-link>
					
					<div
						v-if="page_query.index <= page_data.total_pages - 4"
						class="text-dots inter-medium-mountain-mist-16px"
						>
						<span class="inter-medium-mountain-mist-16px">...</span>
					</div>
					
					<!-- button last -->
					<nuxt-link
						v-if="page_data.total_pages > 1"
						:to="page_links[page_data.total_pages - 1]"
						class="pag-button"
						:class="{ active: page_query.index == page_data.total_pages - 1 }"
						>
						<div class="text">{{ page_data.total_pages }}</div>
					</nuxt-link>
					
					<!-- Next arrow button -->
					<nuxt-link
						v-if="page_data.total_pages > 4"
						:to="next_link"
						:event="page_query.index === page_data.total_pages - 1 ? '' : 'click'"
						class="pag-button button-arrow button-arrow-right border-1px-mercury"
						:class="{disabled: page_query.index == page_data.total_pages - 1}"
						>
						<img class="icon" src="/img/icons/@2x/icon-229@2x.png">
					</nuxt-link>
				</div>
				<!-- Next text button -->
				<nuxt-link
						v-if="page_data.total_pages <= 4"
						:to="next_link"
						:event="page_query.index === page_data.total_pages - 1 ? '' : 'click'"
						class="button-text-arrow button-next border-1px-mercury"
						:class="{disabled: page_query.index == page_data.total_pages - 1}"
						>
					<div class="text-4">Next</div>
					<img class="icon-1" src="/img/icons/@2x/icon-229@2x.png">
				</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
