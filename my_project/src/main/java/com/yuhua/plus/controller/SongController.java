package com.yuhua.plus.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.yuhua.plus.controller.utils.R;
import com.yuhua.plus.dao.Upload_SongDao;
import com.yuhua.plus.domain.Report_Song;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.service.Report_SongService;
import com.yuhua.plus.service.SongService;
import com.yuhua.plus.service.Upload_SongService;
import com.yuhua.plus.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;

// Restful 风格
@Slf4j
@RestController
@RequestMapping("/songs")
public class SongController {

    @Value("${songs.upload-path}")
    private String songUploadPath;

    @Autowired
    private SongService songService;

    @Autowired
    private Upload_SongService uploadSongService;

    @Autowired
    private Report_SongService reportSongService;

    // 查询 上传通过的音乐信息
    @GetMapping("/passInfo")
    @PreAuthorize("hasAuthority('system:mg:test1')") //判断用户信息中是否有‘test’权限，有为true，否则为false
    public R getPassSongInfo() {
        return new R(true, uploadSongService.getPassSongInfo());
    }

    // 管理员标记上传通过的音乐
    @PutMapping("/pass")
    @PreAuthorize("hasAuthority('system:mg:test1')") //判断用户信息中是否有‘test’权限，有为true，否则为false
    public R updateUploadSong(@RequestHeader Long songId) {
        return new R(true, uploadSongService.passSong(songId));
    }

    // 删除举报信息
    @DeleteMapping("/delete/RSI")
    @PreAuthorize("hasAuthority('system:mg:test1')")
    public R deleteReportSongInfo(@RequestHeader Long songId) {
        return new R(true, reportSongService.deleteReportSongInfo(songId));
    }

    // 查询举报信息
    @GetMapping("/reportSongInfo")
    @PreAuthorize("hasAuthority('system:mg:test1')") //判断用户信息中是否有‘test’权限，有为true，否则为false
    public R getReportSongInfo() {
        return new R(true, reportSongService.getReportSongInfo());
    }

    // 举报音乐
    @PostMapping("/reportSong")
    @PreAuthorize("hasAuthority('system:cm:test1')")  //判断用户信息中是否有‘test’权限，有为true，否则为false
    public R getReportSong(@RequestBody Report_Song reportSong) {
        return new R(true, reportSongService.reportSong(reportSong));
    }

    // 查询上传通知
    @GetMapping("/uploadInfo")
    @PreAuthorize("hasAuthority('system:mg:test1')")  //判断用户信息中是否有‘test’权限，有为true，否则为false
    public R getUploadSongsInfo() {
        return new R(true, uploadSongService.getUploadSongsInfo());
    }

    // 查询 缓存歌单
    @GetMapping("/cache")
    public R getCacheSongList(@RequestHeader String cacheSongList) {
        return new R(true, songService.getCacheSongList(cacheSongList));
    }

    // 删除 音乐的数据库数据 及 文件数据
    // 删除所有歌单中的 这首音乐
    @DeleteMapping("/delete")
    public R deleteSong(@RequestBody Song song) {
        return new R(true, songService.deleteSong(song.getId()));
    }

    // 查询所有歌曲
    @GetMapping
    public R getAll() {
        return new R(true, songService.getAll());
    }

    // 查询新歌曲（时间倒序排序）
    @GetMapping("/releaseSong")
    public R getSongByReverseTime() {
        return new R(true, songService.getSongByReverseTime());
    }

    // 查询歌曲（模糊查询 by 名称）
    @GetMapping("/s/{songname}")
    public R querySearchSongByWord(@PathVariable String songname) {
        return new R(true, songService.getSongByName(songname));
    }

    // 查询歌曲（id）
    @GetMapping("/songDetail/{id}")
    public R getSongByid(@PathVariable Long id) {
        return new R(true, songService.getSongById(id));
    }

    // 分页查询
    @GetMapping("{currentPage}/{pageSize}")
    public R getIPage(@PathVariable int currentPage, @PathVariable int pageSize) {
        return new R(true, songService.getPage(currentPage, pageSize));
    }

    // 上传音乐
    @PostMapping("/upload/{uid}")
    public R uploadSong(@RequestPart MultipartFile file,
                        HttpServletRequest request,
                        @RequestPart(value = "contentParam") String contentParam,
                        @PathVariable Long uid) {
        if (file.isEmpty()) {
            return new R(false, "空文件");
        }
        // 如果这里没有设置路径，会默认保存在项目的根目录下
        String fileName = file.getOriginalFilename();   // 获得上传文件名称
        if (!fileName.endsWith(".mp3")) {
            return new R(false, "不允许的文件类型");
        }
        // 文件后缀名
        String[] strings = fileName.split("\\.");
        String suffix = "." + strings[strings.length - 1];
        // 文件路径
//        String realPath = request.getServletContext().getRealPath("/");  // 项目当前运行的路径，项目重启就改变(临时路径)
        String relativelyPath = "\\music";
        String realPath = songUploadPath + relativelyPath;
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
        // 添加歌曲
        Gson gson = new Gson();
        Song song = gson.fromJson(contentParam, Song.class);
        // 设置cover的url
        song.setPath(url);
        song.setDiskPath(realPath + newName);
        System.out.println("\t实体类对象Song ====>\n" + song + "\n\tuid:" + uid);
        return new R(true, songService.addSong(uid, song));
    }

    // 查询用户的上传音乐列表
    @GetMapping("/uploaded/{uid}")
    public R queryUploadSongByUser(@PathVariable Long uid) {
        return new R(true, songService.queryUploadSongByUser(uid));
    }

    // 增加音乐点击次数
    @PutMapping("/uploadSongPlayCount")
    public R incSongPlayCount(@RequestHeader Long songId) {
        return new R(true, songService.incSongPlayCount(songId));
    }

}
