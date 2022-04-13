<template>
	<div class="pagination inter-normal-chicago-16px">
		<div class="ui-left ui-item-per-page">
			<div class="ui-button-group">
				<UIButton
					:class="{active: this.page.query_limit === 10}"
					class="secondary"
					>
					<nuxt-link
						:to="`/urn-admin/${atom_name}?q=${this.page.search_query}&page=${this.page.index + 1}&limit=10`"
						>
						10
					</nuxt-link>
				</UIButton>
				<UIButton
					v-if="this.page.total_atom_count > 25"
					:class="{active: this.page.query_limit === 25}"
					class="secondary"
					>
					<nuxt-link
						:to="`/urn-admin/${atom_name}?q=${this.page.search_query}&page=${this.page.index + 1}&limit=25`"
						>
						25
					</nuxt-link>
				</UIButton>
				<UIButton
					v-if="this.page.total_atom_count > 50"
					:class="{active: this.page.query_limit === 50}"
					class="secondary"
					>
					<nuxt-link
						:to="`/urn-admin/${atom_name}?q=${this.page.search_query}&page=${this.page.index + 1}&limit=50`"
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
			v-if="this.page.total_page_num > 1 && this.page.total_atom_count > this.page.query_limit"
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
							:max="this.page.total_page_num"
							:placeholder="(_self.page.index + 1)"
							v-model="change_page_value"
							@keyup.enter="change_page"
							>
					</div>
				</div>
				<div class="text-2">
					<span class="inter-normal-chicago-16px">of {{ this.page.total_page_num }}</span>
				</div>
			</div>
			<div class="buttons">
				<!-- Prev text button -->
				<nuxt-link
						v-if="this.page.total_page_num <= 4"
						:to="previous_link"
						:event="this.page.index === 0 ? '' : 'click'"
						class="button-text-arrow button-prev border-1px-mercury"
						:class="{disabled: this.page.index == 0}"
						>
					<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
					<div class="text-3">Prev</div>
				</nuxt-link>
				<div class="default">
					<!-- Prev arrow button -->
					<nuxt-link
						v-if="this.page.total_page_num > 4"
						:to="previous_link"
						:event="this.page.index === 0 ? '' : 'click'"
						class="pag-button button-arrow button-arrow-left border-1px-mercury"
						:class="{disabled: this.page.index === 0}"
						>
						<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
					</nuxt-link>
					
					<!-- button 1 -->
					<nuxt-link
						:to="page_links[1]"
						class="pag-button"
						:class="{ active: this.page.index === 0 }"
						>
						<div class="text">1</div>
					</nuxt-link>
					
					<div
						v-if="this.page.index >= 3"
						class="text-dots inter-medium-mountain-mist-16px"
						>
						<span class="inter-medium-mountain-mist-16px">...</span>
					</div>
					
					<nuxt-link
						v-for="(page, index) in this.page.total_page_num"
						v-if="index > 0 && index > _self.page.index - 2 && index < _self.page.index + 2 && index < _self.page.total_page_num - 1"
						:key="index"
						:to="page_links[index]"
						class="pag-button"
						:class="{ active: (index === _self.page.index) }"
						>
						<div class="text">
							{{ page }}
						</div>
					</nuxt-link>
					
					<div
						v-if="this.page.index <= this.page.total_page_num - 4"
						class="text-dots inter-medium-mountain-mist-16px"
						>
						<span class="inter-medium-mountain-mist-16px">...</span>
					</div>
					
					<!-- button last -->
					<nuxt-link
						v-if="this.page.total_page_num > 1"
						:to="page_links[this.page.total_page_num - 1]"
						class="pag-button"
						:class="{ active: this.page.index == this.page.total_page_num - 1 }"
						>
						<div class="text">{{ this.page.total_page_num }}</div>
					</nuxt-link>
					
					<!-- Next arrow button -->
					<nuxt-link
						v-if="this.page.total_page_num > 4"
						:to="next_link"
						:event="this.page.index === this.page.total_page_num - 1 ? '' : 'click'"
						class="pag-button button-arrow button-arrow-right border-1px-mercury"
						:class="{disabled: this.page.index == this.page.total_page_num - 1}"
						>
						<img class="icon" src="/img/icons/@2x/icon-229@2x.png">
					</nuxt-link>
				</div>
				<!-- Next text button -->
				<nuxt-link
						v-if="this.page.total_page_num <= 4"
						:to="next_link"
						:event="this.page.index === this.page.total_page_num - 1 ? '' : 'click'"
						class="button-text-arrow button-next border-1px-mercury"
						:class="{disabled: this.page.index == this.page.total_page_num - 1}"
						>
					<div class="text-4">Next</div>
					<img class="icon-1" src="/img/icons/@2x/icon-229@2x.png">
				</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
