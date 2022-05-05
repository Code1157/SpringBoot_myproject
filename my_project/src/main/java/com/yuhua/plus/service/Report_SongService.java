package com.yuhua.plus.service;

import com.yuhua.plus.controller.utils.ReportSongInfo;
import com.yuhua.plus.domain.Report_Song;

import java.util.List;

public interface Report_SongService {
    int reportSong(Report_Song reportSong);

    List<ReportSongInfo> getReportSongInfo();

    int deleteReportSongInfo(Long songId);
}
