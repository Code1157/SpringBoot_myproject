package com.yuhua.plus;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yuhua.plus.dao.MenuDao;
import com.yuhua.plus.dao.Report_SongDao;
import com.yuhua.plus.dao.SongDao;
import com.yuhua.plus.domain.Report_Song;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.domain.SongBox;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest(classes = MGPApplication.class)
//@ContextConfiguration(classes = MGPApplication.class)
class MGPApplicationTests {

    @Autowired
    private SongDao songDao;

    @Autowired
    private SongService songService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private MenuDao menuDao;

    @Autowired
    private UserService userService;

    @Autowired
    private SongBoxService songBoxService;

    @Autowired
    private Upload_SongService uploadSongService;

    @Autowired
    private Report_SongService reportSongService;

    @Test
    public void getLRC() {

    }

    @Test
    public void testGetReportSongInfo() {
        System.out.println(reportSongService.getReportSongInfo());
    }

    @Test
    public void testReportSong() {
        Report_Song reportSong = new Report_Song();
        reportSong.setUserId(2L);
        reportSong.setSongId(15L);
        reportSong.setReason("侵权作品");
        reportSongService.reportSong(reportSong);
    }

    @Test
    public void testDeleteSongBox() {
        System.out.println(songBoxService.deleteSongBox(1L, 17L));
    }

    @Test
    public void testGetUploadSongsInfo() {
        System.out.println("=================================");
        uploadSongService.getUploadSongsInfo();
        System.out.println("=================================");
    }

    @Test
    public void testIncSongBoxPlayCount() {
        songBoxService.incSongBoxPlayCount(5L);
    }

    @Test
    public void testIncSongPlayCount() {
        songService.incSongPlayCount(1L);
    }

    @Test
    public void testQuerySongList() {
        System.out.println(songBoxService.querySongBoxList(1L));
    }

    @Test
    public void testGetDefaultSongBoxList() {
        songBoxService.getDefaultSongBoxList(1L);
    }

    @Test
    public void testCreateSongBox() {
        SongBox songBox = new SongBox();
        songBox.setTitle("test");
        songBox.setCreaterId(1L);
        System.out.println(songBoxService.createSongBox(songBox));
    }

    @Test
    public void testGetSongBoxList() {
        System.out.println(songBoxService.getSongBoxList(14L));
    }

    @Test
    public void testGetSongByReverseTime() {
        System.out.println(songService.getSongByReverseTime());
    }

    @Test
    public void testRegister() {
        User u = new User();
        u.setUsername("ccc");
        u.setNickname("3c");
        u.setPassword("123");
        u.setEmail("ccc@123.com");
        System.out.println("创建账户:"+userService.register(u));
    }

    @Test
    public void testGetSongById() {
        System.out.println(songService.getSongById(3L));
    }

    @Test
    public void testGetSongByName() {
        System.out.println(songService.getSongByName("海底"));
    }

    @Test
    public void testSelectPermsByUserId() {
        System.out.println(menuDao.selectPermsByUserId(1L));
    }

    // redis联通性测试
    @Test
    public void testString() {
        //操作String类型的数据
        ValueOperations<String, String> valueStr = redisTemplate.opsForValue();
        //存储一条数据
        valueStr.set("goodsProdu", "长安");
        //获取一条数据并输出
        String goodsName = valueStr.get("goodsProdu");
        System.out.println(goodsName);
        //存储多条数据
        Map<String, String> map = new HashMap<>();
        map.put("goodsName", "福特汽车");
        map.put("goodsPrice", "88888");
        map.put("goodsId", "88");

        valueStr.multiSet(map);
        //获取多条数据
        System.out.println("========================================");
        List<String> list = new ArrayList<>();
        list.add("goodsName");
        list.add("goodsPrice");
        list.add("goodsId");
        list.add("goodsProdu");

        List<String> listKeys = valueStr.multiGet(list);
        for (String key : listKeys) {
            System.out.println(key);
        }
    }

    @Test
    public void testHash() {
        //创建对象
        HashOperations<String, String, String> opsForHash = redisTemplate.opsForHash();
        //存储一条数据
        opsForHash.put("orderInfo", "orderId", "11");
        //获取一条数据
        String value = opsForHash.get("orderInfo", "orderId");
        System.out.println(value);

        //存储多条数据
        Map<String, String> map = new HashMap<>();
        map.put("createTime", "2018-06-21");
        map.put("orderSn", "888888");
        opsForHash.putAll("orderInfo", map);
        //获取多条数据
        List<String> listKey = new ArrayList<>();
        listKey.add("createTime");
        listKey.add("orderSn");
        List<String> info = opsForHash.multiGet("orderInfo", listKey);
        for (String s : info) {
            System.out.println(s);

        }

    }

    @Test
    void TestBCryptPasswordEncoder() {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        // encode() 对用户注册的密码进行加密 再把这个加密密钥存进数据库password字段中
        // $2a$10$xh1d2Iz/XcpYYYq2Nj3Imu5eB3xRHav8m6mQ42KF.PYu3jhp0o8hy
//        System.out.println(passwordEncoder.encode("123"));

        // matches() 校验  将用户登录时输入的密码 和 数据库中的加密密码对比  返回true/false
        System.out.println(passwordEncoder.matches("123",
                "$2a$10$xh1d2Iz/XcpYYYq2Nj3Imu5eB3xRHav8m6mQ42KF.PYu3jhp0o8hy"));

    }

    @Test
    void getAll() {
        System.out.println(songService.getAll());
    }

    @Test
    void ipage() {
        IPage page = new Page(1, 5);
        songDao.selectPage(page, null);
    }

    @Test
    void getIPage() {
        songService.getPage(1, 3);
    }

}
