package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao extends BaseMapper<User> {
    // 可自定义SQL语句
}
