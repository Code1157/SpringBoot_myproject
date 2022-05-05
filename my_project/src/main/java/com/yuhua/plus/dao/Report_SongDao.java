package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.controller.utils.ReportSongInfo;
import com.yuhua.plus.domain.Report_Song;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface Report_SongDao extends BaseMapper<Report_Song> {
    List<ReportSongInfo> queryReportSongInfo();
}
