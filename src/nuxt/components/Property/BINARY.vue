<template>
	<div class="ui-property-binary">
		<div class="binary-el">
			<UIRadioButton
				@click.native="select(false)"
				:class="{selected: !molecule[this.prop_name]}"
				/>
			<input
				:id="`${prop_name}.false`"
				ref="`${prop_name}.false`"
				class="urn_input"
				type="radio"
				:name="prop_name"
				value="false"
				v-on:input="on_input"
				:checked="molecule[prop_name] == false"
				>
			<label
				:for="`${prop_name}.false`"
				>
				False
			</label>
		</div>
		<div class="binary-el">
			<UIRadioButton
				@click.native="select(true)"
				:class="{selected: molecule[this.prop_name]}"
				/>
			<input
				:id="`${prop_name}.true`"
				ref="`${prop_name}.false`"
				class="urn_input"
				type="radio"
				:name="prop_name"
				value="true"
				v-on:input="on_input"
				:checked="molecule[prop_name] == true"
				>
			<label
				:for="`${prop_name}.true`"
				>
				True
			</label>
		</div>
	</div>
</template>
<script lang="ts" src="./BINARY.ts"></script>
