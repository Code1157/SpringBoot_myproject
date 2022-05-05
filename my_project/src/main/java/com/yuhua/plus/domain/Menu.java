package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("menu")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Menu implements Serializable {
    @TableId
    private Long id; //
    private String menuName; //菜单名（接口名）
    private String path; //路由地址
    private String component; //组件地址
    private char visible; //菜单状态（0：显示，1：隐藏）
    private char status; //菜单状态（0：正常，1：停用）
    private String perms; //权限标识
    private String icon; //菜单图标
    private Integer delFlag;  //是否删除（0：未删除，1：删除）
}
