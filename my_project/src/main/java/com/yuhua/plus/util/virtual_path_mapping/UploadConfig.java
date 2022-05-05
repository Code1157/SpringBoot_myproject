package com.yuhua.plus.util.virtual_path_mapping;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.File;

/**
 * 配置静态资源映射路径
 */
@Configuration
public class UploadConfig extends WebMvcConfigurerAdapter {

    @Value("${static.file.upload}")
    private String uploadUrl;

    @Value("${static.file.mapping}")
    private String mappingUrl;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射图片保存地址
        /*
         * 说明：增加虚拟路径(经过本人测试：在此处配置的虚拟路径，用springboot内置的tomcat时有效，
         * 用外部的tomcat也有效;所以用到外部的tomcat时不需在tomcat/config下的相应文件配置虚拟路径了,阿里云linux也没问题)
         */
        registry.addResourceHandler(mappingUrl + "/**").addResourceLocations("file:" + uploadUrl + File.separator);
        //阿里云(映射路径去除盘符)
        //registry.addResourceHandler("/ueditor/image/**").addResourceLocations("/upload/image/");
        super.addResourceHandlers(registry);
    }
}
