package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.yuhua.plus.controller.utils.ReportSongInfo;
import com.yuhua.plus.dao.Report_SongDao;
import com.yuhua.plus.domain.Report_Song;
import com.yuhua.plus.service.Report_SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Report_SongServiceImpl implements Report_SongService {

    @Autowired
    private Report_SongDao reportSongDao;

    @Override
    public int reportSong(Report_Song reportSong) {
        return reportSongDao.insert(reportSong);
    }

    @Override
    public List<ReportSongInfo> getReportSongInfo() {
        List<ReportSongInfo> reportSongInfoList = reportSongDao.queryReportSongInfo();
        return reportSongInfoList;
    }

    @Override
    public int deleteReportSongInfo(Long songId) {
        LambdaQueryWrapper<Report_Song> reportSongLambdaUpdateWrapper = new LambdaQueryWrapper<>();
        reportSongLambdaUpdateWrapper.eq(Report_Song::getSongId, songId);
        return reportSongDao.delete(reportSongLambdaUpdateWrapper);
    }
}
