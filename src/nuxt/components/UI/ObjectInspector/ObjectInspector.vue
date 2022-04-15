<template>
	<div class="ui-object monospace">
		<div
			v-for="(value, key) of data"
			:key="`oi${key}`"
			>
			<div
				class="ui-object-wrapper ui-object-array-wrapper"
				v-if="Object.prototype.toString.call(value) == '[object Array]'">
				<button
					v-on:click="toggle(key)"
					:class="{open: wrappers[key]}"
					class="key-name">
					<img v-show="wrappers[key] === false" src="/img/icons/png/chevron_right.png">
					<img v-show="wrappers[key] === true" src="/img/icons/png/expand_more.png">
					<label>{{ key }} <span>[array]</span></label>
				</button>
				<UIArrayInspector
					v-show="wrappers[key] === true"
					v-if="value.length > 0"
					:data="value"
					/>
				<div
					v-else
					v-show="wrappers[key] === true"
					class="empty-array"
					>
					<div>[empty]</div>
				</div>
			</div>
			<div
				class="ui-object-wrapper ui-object-object-wrapper"
				v-else-if="value !== null && typeof value === 'object'">
				<button
					v-on:click="toggle(key)"
					:class="{open: wrappers[key]}"
					class="key-name">
					<img v-show="wrappers[key] === false" src="/img/icons/png/chevron_right.png">
					<img v-show="wrappers[key] === true" src="/img/icons/png/expand_more.png">
					<label>{{ key }} <span>[object]</span></label>
				</button>
				<UIObjectInspector
					v-show="wrappers[key] === true"
					v-if="!!Object.keys(value).length"
					:data="value"
					:name="key"
					/>
				<div
					v-else
					v-show="wrappers[key] === true"
					class="empty-array"
					>
					<div>[empty]</div>
				</div>
			</div>
			<div
				class="ui-object-wrapper ui-object-data-wrapper"
				v-else
				>
				<div class="key-name">
					<label>{{ key }}</label>
				</div>
				<div class="value-wrapper">
					{{ value }}
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./ObjectInspector.ts"></script>
