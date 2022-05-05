package com.yuhua.plus.domain;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("songbox_song")
public class SongBox_Song {
    private Long songboxId;  //歌单id
    private Long songId;    // 歌曲id
}
