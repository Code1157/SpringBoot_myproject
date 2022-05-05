package com.yuhua.plus.controller.utils;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;

@Data
public class R {
    private Boolean flag;  // 成功或失败
    private Object data;  // 存数据
    private Object data2;


    public R() {
    }

    public R(Boolean flag) {
        this.flag = flag;
    }

    public R(Boolean flag, Object data) {
        this.flag = flag;
        this.data = data;
    }

    public R(Boolean flag, Object data, Object data2) {
        this.flag = flag;
        this.data = data;
        this.data2 = data2;
    }
}
