package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User implements Serializable {
    private static final long serialVersionUID = -40356785423868312L;
    @TableId(type = IdType.AUTO)
    private Long id;  // 用户唯一ID
    private String username;  // 账户名
    private String password;  // 密码
    private String nickname;  // 用户昵称
    private String avatar;   // 头像
    private String email;  // 邮箱
    @TableField(fill = FieldFill.INSERT)  //插入data时 自动填充字段值
    private LocalDateTime createTime;  // 账户创建时间
    private String userType;  // 用户类型（0：管理员，1：普通用户）
    private Integer delFlag;  // 删除标志（0：未删除，1：已删除）
}
