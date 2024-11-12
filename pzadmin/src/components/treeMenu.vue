<template>
    <template v-for="(item, index) in props.menuData">
        <!-- 如果是子菜单 -->
        <el-menu-item @click="handleClick(item, `${props.index}-${item.meta.id}`)"
            v-if="!item.children || item.children.length == 0" :index="`${props.index}-${item.meta.id}`"
            :key="`${props.index}-${item.meta.id}`">
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <!-- 如果是菜单，递归子菜单 -->
        <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.name }}</span>
            </template>
            <tree-menu :index="`${props.index}-${item.meta.id}`" :menuData="item.children"></tree-menu>
        </el-sub-menu>
    </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const props = defineProps(['menuData', 'index']);
// 点击菜单
const handleClick = (item, active) => {
    store.commit('addMenu', item.meta);
    router.push({
        path: item.meta.path
    });
};
</script>

<style scoped></style>
