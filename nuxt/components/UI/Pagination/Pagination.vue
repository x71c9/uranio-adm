<template>
	<div class="pagination inter-normal-chicago-16px">
		<div class="go-to inter-normal-chicago-16px">
			<div class="go-to-1">
				<span class="inter-normal-chicago-16px">Go to page</span>
			</div>
			<div class="text-field border-1px-mercury">
				<div class="left">
					<input
						class="pagination_input inter-normal-chicago-16px"
						type="number"
						name="go_to_page"
						:placeholder="(_self.page.index + 1)"
						min="0"
						:max="this.page.total_page_num"
						:value="(_self.page.index + 1)"
						>
				</div>
			</div>
			<!-- <div class="place"><span class="inter-normal-chicago-16px">page</span></div>-->
		</div>
		<div class="ui-page-label">
			<span class="inter-normal-chicago-16px">Page {{ this.page.index + 1 }} of {{ this.page.total_page_num }}</span>
		</div>
		<div class="buttons">
			<!-- Prev text button -->
			<nuxt-link
					v-if="this.page.total_page_num <= 4"
					:to="`/urn-admin/${atom_name}?page=${this.page.index}`"
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
					:to="`/urn-admin/${atom_name}?page=${this.page.index}`"
					:event="this.page.index === 0 ? '' : 'click'"
					class="pag-button button-arrow button-arrow-left border-1px-mercury"
					:class="{disabled: this.page.index === 0}"
					>
					<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
				</nuxt-link>
				
				<!-- button 1 -->
				<nuxt-link
					:to="`/urn-admin/${atom_name}?page=1`"
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
					:to="`/urn-admin/${atom_name}?page=${index + 1}`"
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
					:to="`/urn-admin/${atom_name}?page=${this.page.total_page_num}`"
					class="pag-button"
					:class="{ active: this.page.index == this.page.total_page_num - 1 }"
					>
					<div class="text">{{ this.page.total_page_num }}</div>
				</nuxt-link>
				
				<!-- Next arrow button -->
				<nuxt-link
					v-if="this.page.total_page_num > 4"
					:to="`/urn-admin/${atom_name}?page=${this.page.index + 2}`"
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
					:to="`/urn-admin/${atom_name}?page=${this.page.index + 2}`"
					:event="this.page.index === this.page.total_page_num - 1 ? '' : 'click'"
					class="button-text-arrow button-next border-1px-mercury"
					:class="{disabled: this.page.index == this.page.total_page_num - 1}"
					>
				<div class="text-4">Next</div>
				<img class="icon-1" src="/img/icons/@2x/icon-229@2x.png">
			</nuxt-link>
		</div>
		<!-- <div class="ui-page-label-1"><span class="inter-normal-chicago-16px">Page 1 of 45</span></div>-->
	</div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
<style lang="scss" src="./Pagination.scss"></style>
