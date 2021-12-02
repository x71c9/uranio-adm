<template>
	<div>
		<div v-if="success">
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ title }}</span>
					<span class="ui-atom-name">({{ atom_name }})</span>
				</h1>
				<div class="ui-flex-row-3-el">
					<UIButton v-on:click.native="external_submit">Save</UIButton>
				</div>
			</div>
			<div class="flex-row-4">
				<UIButton
					class="borderless secondary back_button"
					v-on:click.native="$router.back()"
					>
					<img src="/img/icons/png/arrow_back.png" />
					<span>{{ back_label }}</span>
				</UIButton>
				<h2 class="monospace">_id: {{ _self.atom._id }}</h2>
			</div>
			
			<FormAtom
				ref="atom_form"
				@submit_atom_form="submit"
				@submit_exit_atom_form="submit_exit"
				@delete_atom="delete_atom"
				call="update"
				/>
			
			<ModalAtom @atom_selected="modalAtomSelected"/>
		</div>
		<div v-else>
			<div class="flex-row-3">
				<h1 class="ui-flex-row-3-el today inter-medium-white-36px">
					<span class="inter-medium-white-36px">{{ message }}</span>
				</h1>
				<div class="ui-flex-row-3-el">
					<UIButton class="secondary" v-on:click.native="$router.go()">Reload</UIButton>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
