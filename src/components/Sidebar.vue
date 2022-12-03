<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#081832"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    export default {
        setup() {
            const items = [
                {
                    icon: "el-icon-lx-home",
                    index: "/dashboard",
                    title: "首页",
                },

                {
                    icon: "el-icon-lx-calendar",
                    index: "/chartinfo",
                    title: "图表信息",
                },
               /* {
                    icon: "el-icon-lx-calendar",
                    index: "/testv2",
                    title: "测试",
                },
*/
            /*    {
                    icon: "el-icon-lx-home",
                    index: "/topo",
                    title: "拓扑首页",
                },*/
                /*{
                    icon: "el-icon-lx-calendar",
                    index: "3",
                    title: "数据获取",
                    subs: [
                        {
                            index: "4",
                            title: "发包参数选择",
                            subs: [
                                {
                                    index: "/form",
                                    title: "发包内容设置",
                                },
                                // {
                                //     index: "/form1",
                                //     title: "发送对象选择",
                                // },
                                {
                                    index: "/form2",
                                    title: "发送方式设置",
                                },
                                {
                                    index: "/upload",
                                    title: "文件上传",
                                },
                            ],
                        },

                        {
                            index: "4",
                            title: "抓包参数选择",
                            subs: [
                                {
                                    index: "/form3",
                                    title: "抓取方式选择",
                                },
                            ],
                        },
                    ],
                },*/
               /*{
                    icon: "el-icon-lx-calendar",
                    index: "4",
                    title: "文件处理",
                    subs: [
                        {
                        index: "/dealpcapfile",
                        title: "文件处理",
                        },
                      {
                            index: "6",
                            title: "测试",
                            subs: [
                                {
                                    index: "/vuetest",
                                    title: "测试页面",
                                },
                            ],
                        },
                    ],
                },
                {
                    icon: "el-icon-lx-calendar",
                    index: "7",
                    title: "数据可视化",
                    subs: [
                        {
                            index: "/chartinfo",
                            title: "图表信息",
                        },
                        {
                            index: "/timedelay",
                            title: "时延信息",
                        },
                        {
                            index: "/datacount",
                            title: "数量信息",
                        },
                        {
                            index: "/datacount_time",
                            title: "按时间数量信息",
                        },

/!*                        {
                            index: "8",
                            title: "数据",
                            subs: [
                                {
                                    index: "/vision",
                                    title: "饼状图",
                                },
                                {
                                    index: "/datacount_time",
                                    title: "按秒查询折线图",
                                },

                                {
                                    index: "/vision2",
                                    title: "按分查询折线图",
                                },
                                {
                                    index: "/vision3",
                                    title: "按时查询折线图",
                                },

                            ],
                        },

                        {
                            index: "9",
                            title: "异常",
                            subs: [
                                {
                                    index: "/exceptionBar",
                                    title: "柱状图",
                                },
                                {
                                    index: "/exceptionPie",
                                    title: "饼状图",
                                },
                            ],
                        },

                        {
                            index: "10",
                            title: "延迟",
                            subs: [
                                {

                                    index: "/delayBar",
                                    title: "柱状图",
                                },
                                {
                                    index: "/delayNode1",
                                    title: "节点1折线图",
                                },
                                {
                                    index: "/delayNode2",
                                    title: "节点2折线图",
                                },
                                {
                                    index: "/delayNode3",
                                    title: "节点3折线图",
                                },
                                {
                                    index: "/delayNode4",
                                    title: "节点4折线图",
                                },
                            ],
                        },*!/
                    ],
                },*/

            ];

            const route = useRoute();

            const onRoutes = computed(() => {
                return route.path;
            });

            const store = useStore();
            const collapse = computed(() => store.state.collapse);

            return {
                items,
                onRoutes,
                collapse,
            };
        },
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
