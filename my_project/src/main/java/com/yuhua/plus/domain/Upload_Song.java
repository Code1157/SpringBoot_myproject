package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("upload_song")
public class Upload_Song {
    private Long userId;  // 用户ID
    private Long songId;  // 新歌ID
    private Integer pass; // 上传状态（0：等待处理，1：通过）
}
