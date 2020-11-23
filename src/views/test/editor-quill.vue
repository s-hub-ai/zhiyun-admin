<template>
	<cl-editor-quill v-model="content" @load="onLoad" :height="400"></cl-editor-quill>
</template>

<script>
export default {
	data() {
		return {
			content: "",
			options: {
				placeholder: "输入内容"
			}
		};
	},

	methods: {
		onLoad(ref) {
			console.log(ref);
		}
	}
};
</script>
