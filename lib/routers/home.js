import Router from 'koa-router'

const home = new Router();

home.get('/', async (ctx, next) => {
  console.log('home: hi!')
  ctx.body = 'Hello World'
  await next()
  console.log('home: bye!')
})

export default home
