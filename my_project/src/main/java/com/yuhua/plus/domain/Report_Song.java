package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("report_song")
public class Report_Song {
    private Long userId;    //举报人ID
    private Long songId;    //被举报音乐ID
    private String reason;  //举报原因
    @TableField(fill = FieldFill.INSERT)  //插入data时 自动填充字段值
    private LocalDateTime reportTime; // 举报时间
}
