<template>
	<div>
		<draggable
			class="drag-wrapper"
			:class="{dragging}"
			v-if="atom[prop_name].length"
			v-model="atom[prop_name]"
			:group="{put: prop_name, name: prop_name}"
			@start="drag_start()"
			@end="drag_end()"
			v-bind="drag_options"
			handle=".drag_handle"
			>
			<li
				class="ui-li-element ui-li-set"
				v-for="(el, i) in atom[prop_name]"
				:key="`${el}${i}`"
				>
				<div
					v-if="atom[prop_name].length > 1"
					class="drag_handle">
					<img src="/img/icons/png/menu.png"/>
				</div>
				<div class="name">{{ el }}</div>
				<UIButton
					class="secondary small red"
					@click.native.prevent="remove_element(el)"
					>
					Remove
					</UIButton>
			</li>
		</draggable>
		<div style="display: none;">
			<input
				v-for="(el, i) in atom[prop_name]"
				class="urn_input"
				type="hidden"
				:key="`${el}${i}`"
				:name="prop_name"
				:value="el"
				>
		</div>
		<div class="ui-set-add-wrapper">
			<input
				ref="input"
				:type="type"
				:name="prop_name"
				v-model="new_element"
				@keyup.enter="add_element"
				>
			<UIButton class="secondary" @click.native.prevent="add_element">Add</UIButton>
		</div>
	</div>
</template>
<script lang="ts" src="./SET.ts"></script>
