package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.domain.Upload_Song;
import com.yuhua.plus.controller.utils.UploadMsg;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface Upload_SongDao extends BaseMapper<Upload_Song> {

    List<UploadMsg> queryUploadSongsInfo();

    List<UploadMsg> queryPassSongInfo();
}
