import { Router } from '@vaadin/router'
import './simpleweb/boundary/navigation/ResponsiveMenu'
import './simpleweb/boundary/pages/Faq'
import './simpleweb/boundary/pages/Reisen'
import './simpleweb/boundary/pages/Start'
import './simpleweb/boundary/pages/Taschenrechner'
import './simpleweb/boundary/pages/aktionen/Aendern'
import './simpleweb/boundary/pages/aktionen/Anlegen'
import './simpleweb/boundary/pages/aktionen/Loeschen'
import './simpleweb/boundary/pages/bonusActions/Datenschutz'
import './simpleweb/boundary/pages/bonusActions/Impressum'
import './simpleweb/boundary/pages/bonusActions/Kontakt'

const outlet = document.querySelector('.view')
outlet?.classList.add('view')
export const router = new Router(outlet)

router.setRoutes([
  { path: '/', component: 'simple-start' },
  { path: '/reisen', component: 'simple-reisen' },
  { path: '/faq', component: 'simple-faq' },
  { path: '/aktionen/anlegen', component: 'simple-anlegen' },
  { path: '/aktionen/aendern', component: 'simple-aendern' },
  { path: '/aktionen/loeschen', component: 'simple-loeschen' },
  { path: '/datenschutz', component: 'simple-datenschutz' },
  { path: '/impressum', component: 'simple-impressum' },
  { path: '/kontakt', component: 'simple-kontakt' },
  { path: '/taschenrechner', component: 'simple-taschenrechner' },
  { path: '(.*)', component: 'simple-start' }, // fallback
])

let basePath = ''

function go2Path(pathName: any) {
  Router.go(basePath + pathName)
}

export { basePath, go2Path }
