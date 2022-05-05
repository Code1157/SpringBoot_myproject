package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("songbox")
public class SongBox {
    @TableId(type = IdType.AUTO)
    private Long id;       //歌单id
    private String title;  //歌单标题
    private String cover;   //封面
    private Long createrId; //歌单创建者的用户id
    @TableField(fill = FieldFill.INSERT)  //插入data时 自动填充字段值
    private LocalDateTime createTime;   //创建时间
    private String detail;  //简介
    private String type;    //歌单类型
    private Long playCount; //点击量
    private Integer isDefault;  // 是否为默认歌单（0：否，1：是）
}
