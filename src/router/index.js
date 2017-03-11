import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import AppMain from '../components/layout/AppMain.vue'
import Home from '../view/Home.vue'
//Forum
import Forum from '../view/Forum/Forum.vue'
import Table from '../view/Forum/Table.vue'
import Form from '../view/Forum/Form.vue'
import TableReview from '../view/Forum/Table_review.vue'
//User
import User from '../view/User/User.vue'
import User_Block from '../view/User/User_Block.vue'
//data
import Forum_Charts from '../view/charts/Forum_Charts.vue'
import User_Charts from '../view/charts/User_Charts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: AppMain,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/home', component: Home, name: '主页', hidden: false }
        ]
    },
    {
        path: '/',
        component: AppMain,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/forum', component: Forum, name: '板块管理', hidden: false }
        ]
    },
    {
        path: '/',
        component: AppMain,
        name: '帖子管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: Table, name: '帖子列表' },
            { path: '/table_review', component: TableReview, name: '帖子审核' }
        ]
    },
    {
        path: '/',
        component: AppMain,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/user', component: User, name: '用户列表' },
            { path: '/user_block', component: User_Block, name: '拉黑用户' }
            
        ]
    },
    {
        path: '/',
        component: AppMain,
        name: '数据统计',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/forum_charts', component: Forum_Charts, name: '帖子统计' },
            { path: '/user_charts', component: User_Charts, name: '用户统计' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;