import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '首页',
                    keepAlive: true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/form1",
                name: "baseform1",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm1.vue")
            }, {
                path: "/form2",
                name: "baseform2",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm2.vue")
            }, {
                path: "/form3",
                name: "baseform3",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm3.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }, {
                path: '/kkkk',
                name: 'kkkk',
                meta: {
                    title: '王堃'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/wangkun.vue')
            },
            {
                path: '/topo',
                name: 'topo',
                meta: {
                    title: 'topo'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Topo.vue')

            },
            {
                path: '/menu',
                name: 'menu',
                meta: {
                    title: 'menu'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/ContextMenu.vue')

            },
            {
                path: "/vision",
                name: "vision",
                meta: {
                    title: '饼状图'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/visiblevision.vue")
            },
            {
                path: "/chartinfo",
                name: "chartinfo",
                meta: {
                    title: '图表信息',
                    keepAlive: true
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/ChartInfo.vue")
            },
            {
                path: "/datacount_time",
                name: "datacount_time",
                meta: {
                    title: '按秒折线图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/datacount_time.vue")
            },
            {
                path: "/vision2",
                name: "vision2",
                meta: {
                    title: '按分折线图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/visiblevision2.vue")
            },
            {
                path: "/vision3",
                name: "vision3",
                meta: {
                    title: '按时折线图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/visiblevision3.vue")
            },
            {
                path: "/exceptionBar",
                name: "exceptionBar",
                meta: {
                    title: '异常柱状图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/exceptionBar.vue")
            },
            {
                path: "/exceptionPie",
                name: "exceptionPie",
                meta: {
                    title: '异常饼状图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/exceptionPie.vue")
            },
            {
                path: "/delayBar",
                name: "delayBar",
                meta: {
                    title: '时延柱状图'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/delayBar.vue")
            },
            {
                path: "/delayNode1",
                name: "delayNode1",
                meta: {
                    title: '节点一'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/delayNode1.vue")
            },
            {
                path: "/delayNode2",
                name: "delayNode2",
                meta: {
                    title: '节点二'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/delayNode2.vue")
            },
            {
                path: "/delayNode3",
                name: "delayNode3",
                meta: {
                    title: '节点三'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/delayNode3.vue")
            },
            {
                path: "/delayNode4",
                name: "delayNode4",
                meta: {
                    title: '节点四'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/delayNode4.vue")
            },

            //文件处理部分开始
            {
                path: "/dealpcapfile",
                name: "dealpcapfile",
                meta: {
                    title: '文件处理'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/dealpcapfile.vue")
            },
            {
                path: "/timedelay",
                name: "timedelay",
                meta: {
                    title: '时延信息'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/timedelay.vue")
            },
            {
                path: "/datacount",
                name: "datacount",
                meta: {
                    title: '数据包数量'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/datacount.vue")
            },
            {
                path: "/vuetest",
                name: "vuetest",
                meta: {
                    title: '测试'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/vuetest.vue")
            },
            {
                path: "/testv2",
                name: "testv2",
                meta: {
                    title: '测试'
                },
                component: () => import( /* webpackChunkName: "form" */ "../pages/testv2.vue")
            },


        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | situation-awareness`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
