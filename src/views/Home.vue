<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>

            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "../components/Header.vue";
/*import ContextMenu from '../components/ContextMenu.vue'*/
import vSidebar from "../components/Sidebar.vue";
import vTags from "../components/Alive.vue";
import vChartinfo from "../pages/ChartInfo.vue"
import vDashboard from "../views/Dashboard.vue"

export default {
    components: {
        vHeader,
        vSidebar,
        vTags,
    },
    setup() {
        const vchartinfo = vChartinfo;
        const vdashboard = vDashboard;
        const store = useStore();
        const tagsList = computed(() =>
            store.state.tagsList.map((item) => item.name)
        );
        const collapse = computed(() => store.state.collapse);
        return {
            tagsList,
            collapse,
            vchartinfo,
            vdashboard,
        };
    },
};
</script>
<style scoped>
    .content{
        background-color: #030827;
    }
</style>
