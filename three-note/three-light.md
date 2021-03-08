# Threejs 光源对象  

## 光源类型以及用途详解
注意！！！  
`AmbientLight`，`PointLight`，`SpotLight` 和 `DirectionalLight`是基础光源  
`HemisphereLight`，`AreaLight`，`LensFlare` 是有特殊用途的光源  

### 半球光源 HemisphereLight

[半球光源参考资料](https://blog.csdn.net/huhuan123456/article/details/109217496 "半球光源参考资料")

+ 光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色  
+ 半球光不能投射阴影  

此光源可以创建出更加贴近自然的户外光照效果，就是为了模拟在户外场景中的反光效果  
[半球光源官方示例查看地址](https://threejs.org/examples/#webgl_lights_physical "半球光源官方示例查看地址")

`THREE.HemisphereLight`的优势：  
如果不使用`THREE.HemisphereLight`，要模拟户外光照，通常是创建一个`THREE.DirectionalLight`来模拟太阳光，并且可能再添加一个`THREE.AmbientLight`来为场景提供基础色  

半球光源属性介绍
+ color：从天空发出的光线的颜色
+ groundColor：从地面发出的光线的颜色
+ intensity：光源照射的强度。默认值为：1。
+ position：光源在场景中的位置。默认值为：(0, 100, 0)
+ visible：设为 ture（默认值），光源就会打开。设为 false，光源就会关闭。

```
var hemiLight = new THREE.HemisphereLight(天空的反光颜色,地面的反光颜色,光的强度)
var hemiLight = new THREE.HemisphereLight(天空的反光颜色,地面的反光颜色,光的强度)
// 这个也是默认位置
hemiLight.position.set(0, 100, 0)
scene.add(hemiLight)
```

### 环境光 AmbientLight
+ 环境光会均匀的照亮场景中的所有物体
+ 环境光不能用来投射阴影，因为它没有方向

环境光是没有特定方向的光源，主要是均匀整体改变Threejs物体表面的明暗效果，这一点和具有方向的光源不同，比如点光源可以让物体表面不同区域明暗程度不同  
`THREE.AmbientLight`光源影响整个场景，它的光线没有特定来源但是又无处不在，它不能影响阴影生成，并且不能作为唯一光源，使用其他光源的同时使用`THREE.AmbientLight`，目的是弱化阴影和添加一些颜色  

```
// THREE.AmbientLight不需要指定位置，只需要指定颜色（十六进制）
var ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)

```

### 半球光源和环境光源的对比
+ 环境光分为 AmbientLight & HemisphereLight 
+ AmbientLight 物体明暗对比无法呈现
+ HemisphereLight 物体明暗对比比较明显
+ 如果想模拟真实世界，建议用`THREE.HemisphereLight`，如果对三维的展现不是特别苛刻，可以用`THREE.AmbientLight`和`THREE.DirectionalLight`

### 点光源 PointLight
+ 点光源就像生活中的白炽灯，光线沿着发光核心向外发散，同一平面的不同位置与点光源光线入射角是不同的，点光源照射下，同一个平面不同区域是呈现出不同的明暗效果
+ 和环境光不同，环境光不需要设置光源位置，而点光源需要设置位置属性`.position`，光源位置不同，物体表面被照亮的面不同，远近不同因为衰减明暗程度不同
```
var point = new THREE.PointLight(0xffffff)
//设置点光源位置，改变光源的位置
point.position.set(400, 200, 300)
scene.add(point)
```

### 平行光 DirectionalLight
+ 平行光顾名思义光线平行，对于一个平面而言，平面不同区域接收到平行光的入射角一样
+ 点光源因为是向四周发散，所以设置好位置属性`.position`就可以确定光线和物体表面的夹角
+ 对于平行光而言，主要是确定光线的方向，光线方向设定好了，光线的与物体表面入射角就确定了，仅仅设置光线位置是不起作用的
+ 在三维空间中为了确定一条直线的方向只需要确定直线上两个点的坐标即可，所以平行光提供了位置`.position`和目标`.target`两个属性来一起确定平行光方向
+ 目标`.target`的属性值可以是场景中任何一个三维模型对象，比如一个网格模型Mesh，平行光会通过自身位置属性`.position`和`.target`表示的物体的位置属性`.position`计算出来
+ 平行光如果不设置`.position`和`.target`属性，光线默认从上往下照射，也就是可以认为`(0,1,0)`和`(0,0,0)`两个坐标确定的光线方向
+ 注意一点平行光光源的位置属性`.position`并不表示平行光从这个位置向远处照射，`.position`属性只是用来确定平行光的照射方向，平行光你可以理解为太阳光，从无限远处照射过来

```
var directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50)
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh
scene.add(directionalLight)
```

### 聚光源 SpotLight
+ 聚光源可以认为是一个沿着特定方会逐渐发散的光源，照射范围在三维空间中构成一个圆锥体
+ 通过属性`.angle`可以设置聚光源发散角度，聚光源照射方向设置和平行光光源一样是通过位置`.position`和目标`.target`两个属性来实现

```
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(200, 200, 200)
spotLight.target = mesh
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 6
scene.add(spotLight)//光对象添加到scene场景中
```

## 光照阴影实时计算
在具有方向光源的作用下，物体会形成阴影投影效果

### 平行光投影计算
+ Three.js物体投影模拟计算主要设置三部分
+ 一个是设置产生投影的模型对象
+ 一个是设置接收投影效果的模型
+ 最后一个是光源对象本身的设置，光源如何产生投影

```
// 创建方向光光源
var directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(60, 100, 40)
scene.add(directionalLight)

// 设置用于计算阴影的光源对象
directionalLight.castShadow = true

// 设置计算阴影的区域，最好刚好紧密包围在对象周围，如果计算阴影的区域过大：模糊，如果过小：看不到或显示不完整
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 300
directionalLight.shadow.camera.left = -50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.top = 200
directionalLight.shadow.camera.bottom = -100

// 设置mapSize属性可以使阴影更清晰，不那么模糊
// directionalLight.shadow.mapSize.set(1024,1024)
```

### 聚光光源投影计算代码
```
// 创建聚光光源
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(50, 90, 50)
spotLight.angle = Math.PI /6
scene.add(spotLight)


// 设置用于计算阴影的光源对象
spotLight.castShadow = true

// 设置计算阴影的区域，注意包裹对象的周围
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 300
spotLight.shadow.camera.fov = 20
```

### 涉及到阴影实时计算的属性介绍
+ 模型`.castShadow`属性，`.castShadow`属性值是布尔值，默认`false`，用来设置一个模型对象是否在光照下产生投影效果
+ 模型`.receiveShadow`属性，`.receiveShadow`属性值是布尔值，默认`false`，用来设置一个模型对象是否在光照下接受其它模型的投影效果
+ 光源`.castShadow`属性，如果属性设置为`true`， 光源将投射动态阴影，警告: 这需要很多计算资源，需要调整以使阴影看起来正确
+ 光源`.shadow`属性
	> 平行光`DirectionalLight`的`.shadow`属性值是平行光阴影对象`DirectionalLightShadow`  
	> 聚光源`SpotLight`的`.shadow`属性值是聚光源阴影对象`SpotLightShadow`  
+ 阴影对象基类`LightShadow`
	> `LightShadow`属性`.camera`，观察光源的相机对象，从光的角度来看，以相机对象的观察位置和方向来判断，其他物体背后的物体将处于阴影中  
	> `LightShadow`属性`.mapSize`，定义阴影纹理贴图宽高尺寸的一个二维向量Vector2，
	> 较高的值会以计算时间为代价提供更好的阴影质量，宽高分量值必须`是2的幂`直到`给定设备的WebGLRenderer.capabilities.maxTextureSize`
	> 尽管宽度和高度不必相同 (例如，(512, 1024)是有效的)，默认值为 ( 512, 512 )  
	> `LightShadow`属性`.map`，该属性的值是`WebGL`渲染目标对象`WebGLRenderTarget`，使用内置摄像头生成的深度图，超出像素深度的位置在阴影中，在渲染期间内部计算