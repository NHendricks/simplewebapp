import { Router } from '@vaadin/router'
import './simpleweb/boundary/pages/Reisen'
import './simpleweb/boundary/pages/Start'

const outlet = document.querySelector('.view')
outlet?.classList.add('view')
export const router = new Router(outlet)

router.setRoutes([
  { path: '/', component: 'simple-start' },
  { path: '/reisen', component: 'simple-reisen' },
  { path: '(.*)', component: 'simple-start' }, // fallback
])

let basePath = ''

function go2Path(pathName: any) {
  Router.go(basePath + pathName)
}

export { basePath, go2Path }
