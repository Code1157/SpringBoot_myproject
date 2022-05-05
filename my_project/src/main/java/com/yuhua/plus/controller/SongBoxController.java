package com.yuhua.plus.controller;

import com.google.gson.Gson;
import com.yuhua.plus.controller.utils.R;
import com.yuhua.plus.domain.SongBox;
import com.yuhua.plus.domain.SongBox_Song;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.SongBoxService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("songbox")
public class SongBoxController {

    @Value("${songbox.upload-path}")
    private String songboxUploadPath;

    @Autowired
    private SongBoxService songBoxService;

    // 删除歌单
    @DeleteMapping("/delete/sb")
    public R deleteSongBox(@RequestBody DeleteObject deleteObject) {
        return new R(true, songBoxService.deleteSongBox(deleteObject.uid, deleteObject.songboxId));
    }

    // 取消收藏
    @DeleteMapping("/del/{songId}")
    public R deleteSongInSongBox(@RequestBody User user, @PathVariable Long songId) {
        return new R(true, songBoxService.deleteSongInSongBox(user, songId));
    }

    // 删除 指定歌单中 的歌曲
    @DeleteMapping("/delete/{uid}")
    public R deleteSongBySongBox(@PathVariable Long uid, @RequestBody SongBox_Song songBoxSong) {
        return new R(true, songBoxService.deleteSongBySongBox(uid, songBoxSong));
    }

    // 查询用户歌单（id）
    @GetMapping("/{id}")
    public R getSongBoxList(@PathVariable Long id) {
        return new R(true, songBoxService.getSongBoxList(id));
    }

    // “推荐歌单” 查询点击量前5的歌单
    @GetMapping("/recom")
    public R getRecomSongBox5() {
        return new R(true, songBoxService.getRecomSongBox5());
    }

    // 创建歌单
    @PostMapping
    public R createSongBox(@RequestBody SongBox songBox) {
        System.out.println("创建歌单: \n" + songBox);
        // SongBox(id=null, title=测试, cover=null, createrId=1, createTime=null, detail=null, type=null, playCount=null)
        return new R(true, songBoxService.createSongBox(songBox));
    }

    // 查询歌单内歌曲列表
    @GetMapping("/list/{songboxId}")
    public R querySongList(@PathVariable Long songboxId) {
        return new R(true, songBoxService.querySongBoxList(songboxId));
    }

    // 查询某歌单详情
    @GetMapping("/intro/{songboxId}")
    public R querySongBoxIntro(@PathVariable Long songboxId) {
        return new R(true, songBoxService.querySongBox(songboxId));
    }

    // 获取“默认歌单”音乐列表
    @GetMapping("/default/{uid}")
    public R getDefaultSongBoxList(@PathVariable Long uid) {
        return new R(true, songBoxService.getDefaultSongBoxList(uid));
    }

    // 添加歌曲到用户对应歌单
    @PostMapping("/addSong")
    public R addSongToSongBox(@RequestBody SongBox_Song songBox_song) {
        return new R(true, songBoxService.addSongToSongBox(songBox_song));
    }

    // 点击“收藏”歌曲到默认歌单
    @PostMapping("/addSong/{songId}")
    public R addSongToDefault(@RequestBody User user, @PathVariable Long songId) {
        return new R(true, songBoxService.addSongToDefault(user, songId));
    }

    // 判断是否 收藏 了该音乐
    @GetMapping("/default/check/{uid}/{songId}")
    public R querySongIfExist(@PathVariable Long uid, @PathVariable Long songId) {
        return new R(true, songBoxService.querySongIfExist(uid, songId));
    }

    // 更新歌单（编辑歌单）
    @PutMapping("/update/{uid}")
    public R updateSongBox(@RequestPart MultipartFile file,
                           HttpServletRequest request,
                           @RequestPart(value = "contentParam") String contentParam,
                           @PathVariable Long uid) {

        // 文件判空
        if (file.isEmpty()) {
            return new R(false, "空文件");
        }
        // 如果这里没有设置路径，会默认保存在项目的根目录下
        String fileName = file.getOriginalFilename();// 获得上传文件名称
        String fileSuffix = fileName.split("\\.")[1];
        // 文件后缀名
        String[] strings = fileName.split("\\.");
        String suffix = "." + strings[strings.length - 1];
        // 文件路径
        String relativelyPath = "\\images\\cover";
        String realPath = songboxUploadPath + relativelyPath;
        File folder = new File(realPath);
        if (!folder.exists()) {
            folder.mkdirs();// 创建文件夹
        }
        // 文件重命名
        String newName = "\\" + UUID.randomUUID().toString() + suffix;
        String url = "";
        try {
            file.transferTo(new File(folder, newName));
            url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + relativelyPath + newName;
        } catch (IOException e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        SongBox songBox = gson.fromJson(contentParam, SongBox.class);
        // 设置cover的url
        songBox.setCover(url);
        return new R(true, songBoxService.updateSongBoxByUid(uid, songBox));
    }

    @PutMapping("/update2/{uid}")
    public R updateSongBox2(@PathVariable Long uid, @RequestBody SongBox songBox) {
        return new R(true, songBoxService.updateSongBox2(uid, songBox));
    }

    @PutMapping("/uploadSongBoxPlayCount")
    public R incSongBoxPlayCount(@RequestBody SongBox songBox) {
        return new R(true, songBoxService.incSongBoxPlayCount(songBox.getId()));
    }
}

@Data
class DeleteObject {
    protected Long uid;
    protected Long songboxId;
}