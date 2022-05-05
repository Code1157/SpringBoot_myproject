package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.domain.SongBox;
import com.yuhua.plus.domain.SongBox_Song;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SongBoxDao extends BaseMapper<SongBox> {
    // 自定义sql语句
    // 查询歌单内歌曲列表
    List<Song> querySongBoxList(Long songboxId);

    List<Song> querySongBoxListByUid(Long uid, Long songboxId);

    Long getDefaltSongBoxId(Long uid);

    List<SongBox_Song> querySongBox_SongList(Long uid, Long songboxId);
}
