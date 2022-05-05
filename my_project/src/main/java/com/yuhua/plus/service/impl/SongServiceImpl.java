package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yuhua.plus.dao.*;
import com.yuhua.plus.domain.*;
import com.yuhua.plus.service.SongService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private SongDao songDao;

    @Autowired
    private SongBox_SongDao songBoxSongDao;

    @Autowired
    private Upload_SongDao upload_songDao;

    @Autowired
    private Report_SongDao reportSongDao;


    @Override
    public List<Song> getAll() {
        return songDao.selectList(null);
    }

    @Override
    public IPage<Song> getPage(int currentPage, int pageSize) {
        IPage<Song> page = new Page<>(currentPage, pageSize);
        songDao.selectPage(page, null);
        return page;
    }

    @Override
    public List<Song> getSongByName(String songname) {
        LambdaQueryWrapper<Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(Song::getSongname, songname)
                .or()
                .like(Song::getSinger, songname);
        return songDao.selectList(queryWrapper);
    }

    @Override
    public List<Song> getSongById(Long id) {
        LambdaQueryWrapper<Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Song::getId, id);
        return songDao.selectList(queryWrapper);
    }

    @Override
    public IPage<Song> getSongByReverseTime() {
        IPage<Song> page = new Page<>(1,9);
        LambdaQueryWrapper<Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select().orderByDesc(Song::getReleaseTime);
        songDao.selectPage(page, queryWrapper);
        return page;
    }

    @Override
    public int addSong(Long uid, Song song) {
        int i = songDao.insert(song);
        Upload_Song uploadSong = new Upload_Song();
        uploadSong.setUserId(uid);
        uploadSong.setSongId(song.getId());
        int i1 = upload_songDao.insert(uploadSong);
        if (i1 == i  && i > 0) {
            return 1;
        }
        return 0;
    }

    @Override
    public List<Song> queryUploadSongByUser(Long uid) {
        LambdaQueryWrapper<Upload_Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Upload_Song::getUserId, uid);
        List<Upload_Song> upload_songs = upload_songDao.selectList(queryWrapper);
        List<Song> songs = new ArrayList<>();
        for (Upload_Song uploadSong : upload_songs) {
            LambdaQueryWrapper<Song> songLambdaQueryWrapper = new LambdaQueryWrapper<>();
            songLambdaQueryWrapper.eq(Song::getId, uploadSong.getSongId());
            songs.add(songDao.selectOne(songLambdaQueryWrapper));
        }
        return songs;
    }

    @Override
    public int incSongPlayCount(Long songId) {
        Song song = songDao.selectById(songId);
        LambdaUpdateWrapper<Song> queryWrapper = new LambdaUpdateWrapper<>();
        queryWrapper.eq(Song::getId, songId)
                .set(Song::getPlayCount, song.getPlayCount() + 1);
        return songDao.update(null, queryWrapper);
    }

    @Override
    public int deleteSong(Long id) {
        // 从歌单中删除
        LambdaQueryWrapper<SongBox_Song> box_songLambdaQueryWrapper = new LambdaQueryWrapper<>();
        box_songLambdaQueryWrapper.eq(SongBox_Song::getSongId, id);
        songBoxSongDao.delete(box_songLambdaQueryWrapper);
        // 从歌曲中删除
        Song song = songDao.selectById(id);
        String path = song.getDiskPath();
        if (path != null) {
            File file = new File(song.getDiskPath());
            if (!file.exists()) {
                System.out.println("404,文件不存在,或路径错误");
            } else {
                file.delete();  //文件删除
            }
        }
        // 从上传表中删除
        LambdaQueryWrapper<Upload_Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Upload_Song::getSongId, id);
        upload_songDao.delete(queryWrapper);
        // 从举报列表删除（如果有被举报信息）
        LambdaQueryWrapper<Report_Song> reportSongLambdaQueryWrapper = new LambdaQueryWrapper<>();
        reportSongLambdaQueryWrapper.eq(Report_Song::getSongId, id);
        reportSongDao.delete(reportSongLambdaQueryWrapper);
        return songDao.deleteById(id);
    }

    @Override
    public List<Song> getCacheSongList(String cacheSongList) {
        String[] split = cacheSongList.split("/");
        List idList = new ArrayList();
        for (String s : split) {
            idList.add(s);
        }
        List<Song> songList = songDao.selectBatchIds(idList);
        return songList;
    }
}
