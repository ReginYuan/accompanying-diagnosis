<template>
    admin
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { authAdmin } from './../../../api/index'

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})
onMounted(async () => {
    const res = await authAdmin(paginationData)
    console.log('res', res)
})


</script>

<style scoped></style>
