package com.yuhua.plus.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuhua.plus.domain.User_Role;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface User_RoleDao extends BaseMapper<User_Role> {
}
