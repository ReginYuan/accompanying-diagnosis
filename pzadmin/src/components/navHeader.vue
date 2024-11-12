<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon fold" size="30" @click="store.commit('collapseMenu')">
                <Fold v-if="isCollapsed"></Fold>
                <Expand v-else />
            </el-icon>
            <ul class="flex-box">
                <li v-for="(item, index) in selectMenu" :key="item.path" :class="{ selected: route.path === item.path }"
                    class="tag flex-box">
                    <el-icon size="12">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text flex-box" :to="item.path">{{ item.name }}</router-link>
                    <el-icon class="close" size="12" @click="closeTab(item, index)">
                        <Close />
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="header-right">
            <el-dropdown>
                <span class="el-dropdown-link flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <p class="user-name">李小龙</p>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 获取store的实例
const store = useStore();
const route = useRoute();
const router = useRouter();
const isCollapsed = computed(() => store.state.menu.isCollapsed);
const selectMenu = computed(() => store.state.menu.selectMenu);

// 点击关闭tab
const closeTab = (item, index) => {
    store.commit('closeMenu', item);
    // 删除的是非当前页tag不做任何操作
    if (route.path !== item.path) {
        return;
    }
    const selectMenuData = selectMenu.value;
    //如果删除的是最后一项
    if (index === selectMenuData.length) {
        //如果tag只有一个元素
        if (!selectMenuData.length) {
            router.push({ path: '/' });
        } else {
            router.push({
                path: selectMenuData[index - 1].path,
            });
        }
    } else {
        //如果删除的是中间位置tag
        router.push({
            path: selectMenuData[index].path,
        });
    }
};
</script>

<style lang="less" scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #1abc9c;
    padding-right: 25px;

    .header-left {
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        .icon:hover {
            background-color: rgb(#000, 0.2);
            cursor: pointer;
        }

        .fold {
            color: #fff;
        }

        .fold:hover {
            color: #f9ca24;
        }

        .tag {
            height: 100%;
            padding: 0 10px;
            color: #fff;

            .text {
                margin: 0 5px;
                color: #fff;
            }

            .close {
                visibility: hidden;
            }

            &.selected {
                background-color: rgb(#000, 0.2);
                color: #f9ca24;

                a {
                    color: #f9ca24;
                }
            }
        }

        .tag:hover {
            background-color: rgb(#000, 0.2);
            color: #f9ca24;
            cursor: pointer;

            .text {
                color: #f9ca24;
            }

            .close {
                visibility: inherit;
            }
        }
    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }
}

.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}

a {
    height: 100%;
    color: #333;
    font-size: 15px;
}
</style>
