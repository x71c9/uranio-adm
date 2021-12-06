<template>
	<div class="ui-property" :class="prop_classes">
		<div class="ui-property-header">
			<label v-if="prop_type != 'Empty' && prop_type != 'PropertyHIDDEN'">
				{{ prop_label }}
			</label>
			<div
				v-if="prop_type !== 'PropertyReadOnly'"
				class="ui-property-data">
				<div class="prop_data prop_key monospace">
					<img src="/img/icons/png/vpn_key.png">
					{{ prop_key }}
				</div>
				<div class="prop_data prop_type monospace">
					<img src="/img/icons/png/nfc.png">
					{{ prop_type.replace('Property', '') }}
					<div v-if="type_type !== ''" class="prop_type_type">
					{{ type_type }}
					</div>
				</div>
			</div>
		</div>
		<div class="ui-property-body">
			<component
				class="ui-property-in"
				:is="prop_type"
				:focus="prop.focus"
				></component>
			<div class="ui-property-error-wrapper">
				<div v-show="prop.error_message" v-html="prop.error_message">
					{{ prop.error_message }}
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./Property.ts"></script>
