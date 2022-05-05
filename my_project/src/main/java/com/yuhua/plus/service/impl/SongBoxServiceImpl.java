package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yuhua.plus.dao.SongBoxDao;
import com.yuhua.plus.dao.SongBox_SongDao;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.domain.SongBox;
import com.yuhua.plus.domain.SongBox_Song;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.SongBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SongBoxServiceImpl implements SongBoxService {

    @Autowired
    private SongBoxDao songBoxDao;

    @Autowired
    private SongBox_SongDao songBox_songDao;

    @Override
    public List<SongBox> getSongBoxList(Long id) {
        LambdaQueryWrapper<SongBox> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SongBox::getCreaterId, id);
        return songBoxDao.selectList(queryWrapper);
    }

    @Override
    public int createSongBox(SongBox songBox) {
        return songBoxDao.insert(songBox);
    }

    @Override
    public List<Song> querySongBoxList(Long songboxId) {
        return songBoxDao.querySongBoxList(songboxId);
    }

    @Override
    public SongBox querySongBox(Long songboxId) {
        LambdaQueryWrapper<SongBox> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SongBox::getId, songboxId);
        return songBoxDao.selectOne(queryWrapper);
    }

    @Override
    public int addSongToSongBox(SongBox_Song songBox_song) {
        try {
            return songBox_songDao.insert(songBox_song);
        } catch (Exception e) {
            System.out.println("音乐已存在");
            return 0;
        }
    }

    @Override
    public List<Song> getDefaultSongBoxList(Long uid) {
        // 查询用户歌单的“默认歌单”
        Long songBoxId = songBoxDao.getDefaltSongBoxId(uid);  // 拿到歌单ID
        // 查询歌曲
        return songBoxDao.querySongBoxListByUid(uid, songBoxId);
    }

    @Override
    public int addSongToDefault(User user, Long songId) {
        Long songBoxId = songBoxDao.getDefaltSongBoxId(user.getId());// 拿到默认歌单ID
        // 封装 songId 和 songboxId
        SongBox_Song songBox_song = new SongBox_Song();
        songBox_song.setSongboxId(songBoxId);
        songBox_song.setSongId(songId);
        // 添加 歌曲到“默认收藏” 歌单
        return songBox_songDao.insert(songBox_song);
    }

    @Override
    public int querySongIfExist(Long uid, Long songId) {
        Long songBoxId = songBoxDao.getDefaltSongBoxId(uid);// 拿到默认歌单ID
        LambdaQueryWrapper<SongBox_Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SongBox_Song::getSongboxId, songBoxId)
                .eq(SongBox_Song::getSongId, songId);
        return songBox_songDao.selectCount(queryWrapper);
    }

    @Override
    public int deleteSongInSongBox(User user, Long songId) {
        Long songBoxId = songBoxDao.getDefaltSongBoxId(user.getId());// 拿到默认歌单ID
        LambdaQueryWrapper<SongBox_Song> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SongBox_Song::getSongboxId, songBoxId)
                .eq(SongBox_Song::getSongId, songId);
        return songBox_songDao.delete(queryWrapper);
    }

    @Override
    public int deleteSongBySongBox(Long uid, SongBox_Song songBoxSong) {
        LambdaQueryWrapper<SongBox> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SongBox::getCreaterId, uid)
                .eq(SongBox::getId, songBoxSong.getSongboxId());
        if (songBoxDao.selectOne(queryWrapper).getId() > 0) {  // 判断该歌单是否 是这个用户拥有
            LambdaQueryWrapper<SongBox_Song> queryWrapper2 = new LambdaQueryWrapper<>();
            queryWrapper2.eq(SongBox_Song::getSongboxId, songBoxSong.getSongboxId())
                    .eq(SongBox_Song::getSongId, songBoxSong.getSongId());
            return songBox_songDao.delete(queryWrapper2);
        }
        return 0;
    }

    @Override
    public IPage<SongBox> getRecomSongBox5() {
        IPage<SongBox> page = new Page<>(1, 5);
        LambdaQueryWrapper<SongBox> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select().orderByDesc(SongBox::getPlayCount);
        songBoxDao.selectPage(page, queryWrapper);
        return page;
    }

    @Override
    public int updateSongBoxByUid(Long uid, SongBox songBox) {
        LambdaUpdateWrapper<SongBox> queryWrapper = new LambdaUpdateWrapper<>();
        queryWrapper.eq(SongBox::getCreaterId, uid)
                .eq(SongBox::getId, songBox.getId());
        return songBoxDao.update(songBox, queryWrapper);
    }

    @Override
    public int updateSongBox2(Long uid, SongBox songBox) {
        LambdaUpdateWrapper<SongBox> queryWrapper = new LambdaUpdateWrapper<>();
        queryWrapper.eq(SongBox::getCreaterId, uid)
                .eq(SongBox::getId, songBox.getId())
                .set(SongBox::getTitle, songBox.getTitle())
                .set(SongBox::getDetail, songBox.getDetail());
        return songBoxDao.update(null, queryWrapper);
    }

    @Override
    public int incSongBoxPlayCount(Long songboxId) {
        SongBox songBox = songBoxDao.selectById(songboxId);

        LambdaUpdateWrapper<SongBox> queryWrapper = new LambdaUpdateWrapper<>();
        queryWrapper.eq(SongBox::getId, songboxId)
                .set(SongBox::getPlayCount, songBox.getPlayCount() + 1);
        return songBoxDao.update(null, queryWrapper);
    }

    @Override
    public int deleteSongBox(Long uid, Long songboxId) {
        List<SongBox_Song> songbox_song_sId = songBoxDao.querySongBox_SongList(uid, songboxId);
        LambdaQueryWrapper<SongBox_Song> queryWrapper;
        if (songbox_song_sId.get(0) != null) {
            for (SongBox_Song songBoxSong : songbox_song_sId) {
                queryWrapper = new LambdaQueryWrapper<>();
                queryWrapper.eq(SongBox_Song::getSongboxId, songBoxSong.getSongboxId())
                        .eq(SongBox_Song::getSongId, songBoxSong.getSongId());
                songBox_songDao.delete(queryWrapper);
            }
        }
        LambdaQueryWrapper<SongBox> songBoxLambdaQueryWrapper = new LambdaQueryWrapper<>();
        songBoxLambdaQueryWrapper.eq(SongBox::getId, songboxId)
                .eq(SongBox::getCreaterId, uid);
        return songBoxDao.delete(songBoxLambdaQueryWrapper);
    }
}
