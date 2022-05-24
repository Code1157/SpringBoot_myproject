package com.yuhua.plus.handler;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yuhua.plus.controller.utils.spring_security.RedisCache;
import com.yuhua.plus.dao.MenuDao;
import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.domain.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.yuhua.plus.domain.User;

import java.io.Serializable;
import java.util.*;

@Component
public class UserPermissionEvaluator implements PermissionEvaluator {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private MenuDao menuDao;

    /**
     * hasPermission鉴权方法
     *
     * @Param permission 请求按钮的权限
     * @Return boolean 是否通过
     */
    @Override
    public boolean hasPermission(Authentication authentication, Object targetUrl, Object permission) {
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        System.out.println("**************hasPermission***************");
        User principal = (User) authentication.getPrincipal();  //拿到登录用户对象

        List<String> authList = menuDao.selectPermsByUserId(principal.getId());
        for (String s : authList) {
            System.out.println("=====================================");
            System.out.println("=====================================");
            System.out.println("=====================================");
            System.out.println(s);
            System.out.println("=====================================");
            System.out.println("=====================================");
            System.out.println("=====================================");
        }

        String redisKey = "login:" + principal.getId();
        LoginUser loginUser = redisCache.getCacheObject(redisKey);
        Collection<? extends GrantedAuthority> authorities = loginUser.getAuthorities();
        Set<String> permissions = new HashSet<>();
        for (GrantedAuthority authority : authorities) {
            permissions.add(String.valueOf(authority));
        }
        return permissions.contains(permission.toString());
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return false;
    }
}
