const router = new (require('koa-router'))({
    prefix:'/v1'
});
const path = require('path');
const multipartParser = require('koa-body')({multipart:true});

//controllers
const controllers = requireAll(path.join(_dirRoot,'libs','controllers'));

router.post('/item',multipartParser,controllers.items.postItem);
router.get('/items',controllers.items.getItems);

module.exports = router;

