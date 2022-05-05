package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.domain.Song;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SongDao extends BaseMapper<Song> {
    // 自定义sql语句
//    @Select("select * from song where id = #{id}")
//    public Song getById(Integer id);

}
