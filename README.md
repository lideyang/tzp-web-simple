# 投资派PC静态文件

###DEMO
我发到自己的博客可以外网看到效果
[lidy个人博客](http://tzp.lideyang.net/views/account/login.html)

### 如何显示

因为是绝对路径，要启用Apache等web服务游览

### 目录结构

```
.
 	├── mock								  // 测试接口json文件
    ├── public                                // 框架css，字体图标、图片文件、外部js插件
    ├── src                                   // 源码目录
        ├── css                               // 全局、页面样式表
        ├── js                                // js文件
			├── pages                         // 页面业务逻辑js
			├── plugins                       // 全局使用的插件
			├── tools                         // 工具类
		├── sass                              // bootstrap预编译样式，因为改了一些全局样式，以后用来生成bootstrap.css
	├── views                        	  	  // 静态页面html视图
.
```