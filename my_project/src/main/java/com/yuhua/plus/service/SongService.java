package com.yuhua.plus.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yuhua.plus.domain.Report_Song;
import com.yuhua.plus.domain.Song;

import java.util.List;

public interface SongService {

    List<Song> getAll();

    IPage<Song> getPage(int currentPage, int pageSize);

    List<Song> getSongByName(String songname);

    List<Song> getSongById(Long id);

    IPage<Song> getSongByReverseTime();

    int addSong(Long uid, Song song);

    List<Song> queryUploadSongByUser(Long uid);

    int incSongPlayCount(Long songId);

    int deleteSong(Long id);

    List<Song> getCacheSongList(String cacheSongList);

}
