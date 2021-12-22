<template>
	<div>
		<!-- {{ this.target }} -->
		<form
			:action="target"
			class="dropzone"
			>
			<div class="fallback">
				<input name="file" type="file" />
			</div>
		</form>
	</div>
</template>
<script lang="ts" src="./media.ts"></script>
