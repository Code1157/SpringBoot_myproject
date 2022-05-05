package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@TableName("song")
public class Song {
    @TableId(type = IdType.AUTO)
    private Long id;            //歌曲唯一标识
    private String songname;    //歌名
    private String singer;      // 歌手
    private String album;       // 专辑
    private String tag;         // 标签（如轻音乐）
    private String timelength;  // 歌曲时长
    private String cover;       // 封面（地址）
    private String lyric;       // 歌词
    private String path;        // 歌曲访问url地址
    private String language;    // 语种
    private String sect;        // 音乐流派/派别
    private LocalDateTime publishTime;    //发行时间
    @TableField(fill = FieldFill.INSERT)  //插入data时 自动填充字段值
    private LocalDateTime releaseTime;    //在平台发布时间
    private Long playCount;     // 播放次数
    private String diskPath;    //硬盘存储路径
    private String copyright;   //版权
}
