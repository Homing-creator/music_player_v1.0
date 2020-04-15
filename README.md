# 登录

1. 浏览器发送请求，包含邮箱，密码
2. 服务器接收请求，验证邮箱密码
3. 正确，生成 token ，将（token，用户名，头像）发送给浏览器
4. 浏览器将接收到的（token，用户名，头像）保存到 session 中（用于刷新之后保存登录状态），保存到 localstorage 中（用于下次进入网页时自动登录）
5. vuex 读取 session 中的（token，用户名，头像）

# 注册



# 音乐播放



# 音乐推荐



# 音乐收藏



# 上传、下载



# 评论



```javascript
const baseUrl = 'https://api.mtnhao.com/'
```

# 关于跨域以及预请求的处理

跨域处理：

在服务端设置 响应头

```javascript
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})
```

然后实际上如果要在 浏览器端的请求头加上 token 即 [Authorization] 的话，会让请求变成非简单请求而造成发请求的时候会多发一次预请求

预请求处理：

1. 使用代理服务器（未知）

2. 在服务器中设置请求头：

   ```javascript
   // 后端设置，2592000，单位秒，也就是30天，如果是一天，就是86400
   res.header("Access-Control-Max-Age", "2592000")
   ```

   注意：这种方式是第一次请求会有一次预请求，之后在设定的时间里不会再预请求，实际上相当于在第一次请求之后会在服务器缓存预请求，所以之后不用再预请求。

3. 不在请求头添加信息，即不修改默认的请求头，把 token 放在 data 里面。

> 参考：
>
> Node.js如何设置允许跨域_JavaScript_张培跃的个人博客-CSDN博客 https://blog.csdn.net/u012149969/article/details/81145144
>
> 怎样避免CORS跨域发出OPTIONS请求？ - 简书 https://www.jianshu.com/p/0cf5db81fa23