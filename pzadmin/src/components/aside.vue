<template>
    <el-menu
        :style="{width: !isCollapsed ? '230px' : '64px'}"
        active-text-color="#ffd04b"
        background-color="#1abc9c"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapsed"
        @open="handleOpen"
        @close="handleClose"
    >
        <p class="logo-lg">{{!isCollapsed ? 'DIDI陪诊系统' : 'DIDI'}}</p>
        <TreeMenu :index="1" :menuData="menuData" />
    </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
const router = useRouter();
const menuData = reactive(router.options.routes[0].children);
const store = useStore()

const  isCollapsed = computed(()=> store.state.menu.isCollapsed)
const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;
    border-radius: 0 1% 1% 0;
    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
        // border: 2px solid #fff;
        // border-radius: 80%;
        margin: 5px;
    }
}
</style>
