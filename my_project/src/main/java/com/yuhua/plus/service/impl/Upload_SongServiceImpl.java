package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.yuhua.plus.dao.SongDao;
import com.yuhua.plus.dao.Upload_SongDao;
import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.domain.Upload_Song;
import com.yuhua.plus.controller.utils.UploadMsg;
import com.yuhua.plus.service.Upload_SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Upload_SongServiceImpl implements Upload_SongService {

    @Autowired
    private Upload_SongDao uploadSongDao;

    /*
    * 获取用户上传通知信息
    * */
    @Override
    public List<UploadMsg> getUploadSongsInfo() {
        List<UploadMsg> uploadMsgList = uploadSongDao.queryUploadSongsInfo();
        return uploadMsgList;
    }

    @Override
    public int passSong(Long songId) {
        LambdaUpdateWrapper<Upload_Song> uploadSongLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
        uploadSongLambdaUpdateWrapper.eq(Upload_Song::getSongId, songId)
                .set(Upload_Song::getPass, 1);
        return uploadSongDao.update(null, uploadSongLambdaUpdateWrapper);
    }

    @Override
    public List<UploadMsg> getPassSongInfo() {
        List<UploadMsg> uploadMsgList = uploadSongDao.queryPassSongInfo();
        return uploadMsgList;
    }
}
