package com.yuhua.plus.service;

import com.yuhua.plus.controller.utils.UploadMsg;
import com.yuhua.plus.domain.Report_Song;

import java.util.List;

public interface Upload_SongService {
    List<UploadMsg> getUploadSongsInfo();

    int passSong(Long songId);

    List<UploadMsg> getPassSongInfo();
}
