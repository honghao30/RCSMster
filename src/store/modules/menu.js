import { getMenus } from '@/api/common/menu'

let menuUtils = {
  setTreeMenu(menuData) {
    let tree = { children: [] }

    menuData.forEach(menuItem => {
      this.resolveTreeMenu(menuItem, tree, tree)
    })

    return tree.children
  },
  resolveTreeMenu(menuItem, targetMenuItem, tree) {
    if ((menuItem.menuLevel | 0) === 1) {
      tree.children.push(menuItem)
      return
    }

    if (menuItem['parentMenuId'] === targetMenuItem['menuId']) {
      if (!targetMenuItem.children) targetMenuItem.children = []
      targetMenuItem.children.push(menuItem)
      return
    }
    if (targetMenuItem.children) {
      targetMenuItem.children.forEach(newTargetMenuItem => {
        this.resolveTreeMenu(menuItem, newTargetMenuItem, tree)
      })
    }
  }
}

export default {
  state: {
    menus: [],
    treeMenus: [],
    // 선택된 메뉴 정보, 1depth 메뉴가 선택 시, 변경을 위해 사용된다.
    selectedMenu: {
      menuId: ''
    }
  },
  mutations: {
    SET_MENU: (state, menus) => {
      state.menus = menus
    },
    SET_TREE_MENU: (state, treeMenus) => {
      state.treeMenus = treeMenus
    },
    SET_CURRENT_MENU: (state, selectedMenu) => {
      state.selectedMenu = selectedMenu
    }
  },
  actions: {
    GetMenus({ commit }) {
      return new Promise((resolve, reject) => {
        // 초기화
        commit('SET_MENU', [])
        commit('SET_TREE_MENU', [])
        getMenus()
          .then(response => {
            commit('SET_MENU', response)
            commit('SET_TREE_MENU', menuUtils.setTreeMenu(response))
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SetSelectedMenu({ commit }, menu) {
      commit('SET_CURRENT_MENU', menu)
    }
  }
}
