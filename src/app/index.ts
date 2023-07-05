import { createApp } from "vue"

import App from "./index.vue"
import { router, store } from "./providers"
import "./style.css"

createApp(App).use(router).use(store).mount("#app")
