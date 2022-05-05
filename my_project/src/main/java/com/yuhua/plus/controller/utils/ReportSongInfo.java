package com.yuhua.plus.controller.utils;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportSongInfo {
    private String whistleblower;  //举报人
    private String reason;         //举报原因

    private String uploader;    //上传者

    private Long id;            //音乐ID
    private String songname;    //歌名
    private String singer;      //歌手
    private String album;       //专辑
    private String tag;         //标签
    private String timelength;  //时长
    private String cover;       //封面路径
    private String lyric;       //歌词
    private String sect;        //  流派
    private String language;    //语言
    private LocalDateTime publishTime;  //  首发时间
    private LocalDateTime releaseTime;  //  在平台发布时间
    private String copyright;   // 版权号
    private String path;        // 路径
    private Long playCount;     // 播放次数
}
