#### 创建两个应用

    父子应用：父应用中包含子应用，父子应用用的vue、react、jq都是可以的

#### 根据规范暴露接口

    需要通过父应用加载子应用

    暴露接口：bootstrap、mount、unmount

    利用single-spa库： vue的话就引入 single-sap-vue
                        react的话就引入： single-sap-react

##### 子应用中

    在main.js中引入single-spa-vue,然后配置相关协议和信息

    创建vue.config.js文件，配置webpack打包信息

##### 父应用中

    在App.vue中创建子应用加载的位置

    在父应用中引入single-spa

    在父应用中通过single-spa引入子应用的资源文件路径

##### 子应用中

    更改子应用中的baseRoute: /vue

    更改子应用中打包路径，即父应用加载子应用的时候需要加载的文件路径前缀应该是子应用的10000而不是父应用的8080

#### singleSpa 的缺陷

    不过灵活，不能动态加载js文件
            // 需要人为的添加这样的 script标签
            await loadScript(`http://localhost:10000/js/chunk-vendors.js`);

    样式不隔离
            // 父子应用中的样式会相互影响

    没有js的沙箱机制
            // 加载不同的js的时候，用的都是同一个window对象，这可能会有问题

#### singleSpa 的实现机制

    1、加载主应用（父应用）

    2、当条件满足的时候（如：地址是/vue的时候）会加载另一个应用（子应用）的脚本文件

    3、当加载对应的子应用的时候，子应用中通过singleSpa打包的时候会暴露出 bootstrap、mount等接口

    4、当子应用中调用mount等接口的时候，就会将singleSpa包含的子应用的脚本放到父应用中进行加载

    5、需要注意的是singleSpa中加载文件的路径都是绝对路径，相对自己的路径而不是相对父应用的路径
