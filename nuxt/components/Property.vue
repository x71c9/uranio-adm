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
				</div>
			</div>
		</div>
		<component :is="prop_type" :focus="prop.focus"></component>
	</div>
</template>
<script lang="ts" src="./Property.ts"></script>
