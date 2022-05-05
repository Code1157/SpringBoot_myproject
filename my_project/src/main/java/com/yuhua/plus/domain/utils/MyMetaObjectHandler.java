package com.yuhua.plus.domain.utils;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    /*
    * 新增时 填充
    * */
    @Override
    public void insertFill(MetaObject metaObject) {
        System.out.println("insertFill......," + LocalDateTime.now());
        this.strictInsertFill(metaObject, "releaseTime", () -> LocalDateTime.now(), LocalDateTime.class);
        this.strictInsertFill(metaObject, "createTime", () -> LocalDateTime.now(), LocalDateTime.class);
        this.strictInsertFill(metaObject, "reportTime", () -> LocalDateTime.now(), LocalDateTime.class);
    }

    /*
    * 更新时 填充
    * */
    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
