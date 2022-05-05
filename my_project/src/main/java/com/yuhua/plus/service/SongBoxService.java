package com.yuhua.plus.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.domain.SongBox;
import com.yuhua.plus.domain.SongBox_Song;
import com.yuhua.plus.domain.User;

import java.util.List;

public interface SongBoxService {
    List<SongBox> getSongBoxList(Long id);

    int createSongBox(SongBox songboxname);

    List<Song> querySongBoxList(Long songboxId);

    SongBox querySongBox(Long songboxId);

    int addSongToSongBox(SongBox_Song songBox_song);

    List<Song> getDefaultSongBoxList(Long uid);

    int addSongToDefault(User user, Long songId);

    int querySongIfExist(Long uid, Long songId);

    int deleteSongInSongBox(User user, Long songId);

    int deleteSongBySongBox(Long uid, SongBox_Song songBoxSong);

    IPage<SongBox> getRecomSongBox5();

    int updateSongBoxByUid(Long uid, SongBox songBox);

    int updateSongBox2(Long uid, SongBox songBox);

    int incSongBoxPlayCount(Long songboxId);

    int deleteSongBox(Long uid, Long songboxId);
}
