import drawerM from '@/components/custom//drawerM/drawerM'
import pageM from '@/components/custom//pageM/pageM'
// import tableM from '@/components/custom//tableM/tableM'
import tableExpandRow from '@/components/custom//tableM/tableExpandRow'
import tableExpandRow2 from '@/components/custom//tableM/tableExpandRow2'
import userHeaderM from '@/components/custom//userHeaderM/userHeaderM'
import userFooterM from '@/components/custom//userFooterM/userFooterM'

import modalM from '@/components/custom//modalM/modalM'
export default (Vue) => {
  Vue.component('drawer-m', drawerM)
  Vue.component('page-m', pageM)
  // Vue.component('table-m', tableM)
  Vue.component('modal-m', modalM)
  Vue.component('table-expand-row', tableExpandRow)
  Vue.component('table-expand-row2', tableExpandRow2)
  Vue.component('user-header-m', userHeaderM)
  Vue.component('user-footer-m', userFooterM)
}
