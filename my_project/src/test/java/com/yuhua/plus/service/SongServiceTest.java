package com.yuhua.plus.service;

import com.yuhua.plus.dao.SongDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SongServiceTest {

    @Autowired
    private SongService songService;

    @Test
    void testgetById() {
//        System.out.println( songService.getById(2));
    }
}
