/************************************/
/************懒加载 所有的路由模块并导出给main.js******************/
// public
export const Index = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/common/index.vue'))
    })
};
export const Error404 = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/common/404.vue'))
    })
};
// 公共的Index父级组件
export const CommonIndex = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/routes/Index.vue'))
    })
};
//ppt模板
export const pptModalComponent = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/routes/PPTmodal/pptModal.vue'))
    })
}
export const pptModalEditComponent = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/routes/PPTmodal/pptModalEdit.vue'))
    })
}
//用户信息
export const userInfoComponent = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/routes/userInfo/userInfo.vue'))
    })
}
export const userInfoEditComponent = resolve => {
    require.ensure([], (require) => {
        resolve(require('./components/routes/userInfo/userInfoDetail.vue'))
    })
}
