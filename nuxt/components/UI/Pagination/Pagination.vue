<template>
	<div class="pagination inter-normal-chicago-16px">
		<div class="ui-page-label">
			<span class="inter-normal-chicago-16px">Page 1 of 45</span>
		</div>
		<div class="buttons">
			<button class="button-text-arrow disabled button-prev border-1px-mercury">
				<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
				<div class="text-3">Prev</div>
			</button>
			<div class="default">
				<button class="pag-button button-arrow button-arrow-left disabled border-1px-mercury">
					<img class="icon" src="/img/icons/@2x/icon-228@2x.png">
				</button>
				<button class="pag-button active">
					<div class="text">
						00
					</div>
				</button>
				<button class="pag-button">
					<div class="text">
						00
					</div>
				</button>
				<button class="pag-button">
					<div class="text">
						00
					</div>
				</button>
				<button class="pag-button">
					<div class="text">
						00
					</div>
				</button>
				<button class="pag-button">
					<div class="text">
						00
					</div>
				</button>
				<div class="text-dots inter-medium-mountain-mist-16px">
					<span class="inter-medium-mountain-mist-16px">...</span>
				</div>
				<button class="pag-button">
					<div class="text">
						00
					</div>
				</button>
				<button class="pag-button button-arrow button-arrow-right border-1px-mercury">
					<img class="icon" src="/img/icons/@2x/icon-229@2x.png">
				</button>
			</div>
			<button class="button-text-arrow button-next border-1px-mercury">
				<div class="text-4">Next</div>
				<img class="icon-1" src="/img/icons/@2x/icon-229@2x.png">
			</button>
		</div>
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
						placeholder="10"
						min="0"
						max="10"
						>
				</div>
			</div>
			<!-- <div class="place"><span class="inter-normal-chicago-16px">page</span></div>-->
		</div>
		<!-- <div class="ui-page-label-1"><span class="inter-normal-chicago-16px">Page 1 of 45</span></div>-->
	</div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
<style lang="scss" src="./Pagination.scss"></style>
