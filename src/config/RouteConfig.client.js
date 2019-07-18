/**
 * 定义路由配置。
 *
 * @author    Yao
 */
/* eslint-disable */

export default [{
        path: '/',
        exact: true,
        component: () => import('../pages/Index'),
    }, {
        path: '/test',
        // component: () => require('../pages/Index'),
        component: () => import('../pages/Test'),
    },
    // {
    //     path: '/tableDemo',
    //     component: () => import('../pages/TableDemo'),
    // },
    // {
    //     // path: '/third/:id',  // 路由设置存在先后顺序，如果先设置此，且未设置正则表达式时，下面的路由设置/third/forth将会被此条设置拦截
    //     path: '/third/:id(\\d{1,3})', // 路由设置存在先后顺序，如果先设置此，且未设置正则表达式时，下面的路由设置/third/forth将会被此调设置拦截
    //     component: () => import('../pages/Third'),
    // },
    // {
    //     path: '/third',
    //     strict: true,
    //     component: () => import('../pages/Third'),
    //     routes: [{ // 设置页面内子路由，将会在页面底部增加子路由展示
    //         path: '/third/forth',
    //         sensitive: true, // 设置路由大小写敏感
    //         component: () => import('../pages/Forth'),
    //     }],
    // }
];