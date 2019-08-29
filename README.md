## 数据库
采用mongo作为数据库，docker化安装
### 安装
```
docker image pull mongo
docker run --name resume-mongo -p 27017:27017 -v ~/DEV/docker-mount/mongo/db:/data/db -d mongo
```
### 建表
```
// 进入容器
docker exec -i -t resume-mongo /bin/bash
// 进入mongo终端
mongo
// 创建数据库
use resume
// 查看数据库，目前刚创建的resume库并不在列表中，需要插入数据才会显示
show dbs
// 创建集合(表)
db.createCollection("description", {autoIndexId: true})
db.createCollection("jobs", {autoIndexId: true})
db.createCollection("projects", {autoIndexId: true})
db.createCollection("educations", {autoIndexId: true})
// 插入数据
db.description.insert({
    name: '',
    sex: '',
    birth: '',
    comment: ''
})
db.jobs.insert({
    company: '',
    department: '',
    title: '',
    start: '',
    end: '',
    u: ''
})
db.projects.insert({
    company: '',
    department: '',
    title: '',
    start: '',
    end: '',
    u: ''
})
db.educations.insert({
    school: '',
    start: '',
    end: '',
    qualification: '',
    u: ''
})
```

### 安装node依赖
```
npm install --save mongo
```

### node连接mongo
```
import { MongoClient } from 'mongodb';
```