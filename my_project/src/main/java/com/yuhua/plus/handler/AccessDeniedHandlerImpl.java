package com.yuhua.plus.handler;

import com.alibaba.fastjson.JSON;
import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.controller.utils.spring_security.WebUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult responseResult = new ResponseResult(HttpStatus.FORBIDDEN.value(), "您的权限不够");
        String json = JSON.toJSONString(responseResult);
        // 处理异常
        WebUtils.renderString(response, json);
    }
}
