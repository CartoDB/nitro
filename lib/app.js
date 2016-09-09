import Koa from 'koa'
import errorHandler from './error-handler'
import responseTime from './response-time'

import home from './routers/home'

const app = new Koa()

app.use(errorHandler)
app.use(responseTime)
app.use(home.routes())

app.listen(3001)
