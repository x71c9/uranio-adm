<template>
	<div>
		<div v-if="success">
			<button v-on:click="$router.back()">Back</button>
			<!-- <h1>{{ _self.atom._id }}</h1>-->
			<br>
			<br>
			<form
					@submit.prevent="submit"
					@keydown.enter.prevent
					@keyup.enter.prevent
					autocomplete="off"
				>
				<div v-for="property in atom_props" :key="property">
					
					<Property :prop_name="property"></Property>
					
				</div>
				<button type="submit">Update</button>
				<button @click.prevent="delete_atom">Delete</button>
			</form>
			<!-- <ModalAtom @atom_selected="myMethod" />-->
			<ModalAtom @atom_selected="modalAtomSelected"/>
		</div>
		<div v-else>
			<strong>{{ message }}</strong>
		</div>
	</div>
</template>
<script lang="ts" src="./_slug.ts"></script>
